import _globalThis from '../@types/global-this';

import { DuckDBInstance, DuckDBConnection, DuckDBTimestampMillisecondsValue } from '@duckdb/node-api';
import * as fs from 'fs/promises';

import * as iface from './iface';

let db: DuckDBInstance | undefined = undefined;
let conn: DuckDBConnection | undefined = undefined;

export const getDb = async (): Promise<DuckDBInstance> => {
  if (db) { return db; }

  // FIXME This could benefit from a location-specific config.
  if (_globalThis.app_location === 'local') {
    // MCP uses metrics db, which is another process, so this won't work.
    //db = await DuckDBInstance.create(':memory:');

    try {
      await fs.mkdir(`${process.cwd()}/data`, { recursive: true }); // Ensure data path exists. It's where you store .duckdb files etc.
    } catch (error) {} // Eat.

    try {
      await fs.rm(localMetricsFilePath, { force: true }); // Start fresh locally.
    } catch (error) {} // Eat.

    db = await DuckDBInstance.create(localMetricsFilePath, {
      threads: '2',
      memory_limit: '5GB'
    });
  } else {
    await fs.mkdir('/opt/app', { recursive: true }); // Ensure data path exists. It's where you store .duckdb files etc.

    db = await DuckDBInstance.create(metricsFilePath, {
      threads: '4',
      memory_limit: '10GB' // FIXME Validate for Hetzner infra.
    });
  }

  await initDbSchema(db);

  return db;
}

const localMetricsFilePath = `${process.cwd()}/data/local-meblog-metrics.duckdb`;
const metricsFilePath = '/opt/app/meblog-metrics.duckdb';

const initDbSchema = async (db: DuckDBInstance) => {
  if (!conn) { conn = await db.connect(); }

  try {
    await conn.run(`
      CREATE SEQUENCE IF NOT EXISTS raw_metrics_id_seq
    `);

    //CREATE TABLE IF NOT EXISTS ${_globalThis.app_location === 'local' ? 'memory.': ''}raw_metrics (
    await conn.run(`
      CREATE TABLE IF NOT EXISTS raw_metrics (
        id BIGINT DEFAULT nextval('raw_metrics_id_seq') PRIMARY KEY, -- Auto-incrementing.
        metric_name VARCHAR NOT NULL,
        metric_type VARCHAR NOT NULL, -- "count" or "table"
        value INTEGER NOT NULL, -- can be "count" or actual "value", e.g. 1000 mb of disk space left for disk usage metric
        timestamp TIMESTAMP_MS NOT NULL, -- ms
        metadata JSON -- json
      )
    `);

    //CREATE INDEX idx_metric_name ON ${_globalThis.app_location === 'local' ? 'memory.': ''}raw_metrics (metric_name, timestamp)
    await conn.run(`
      CREATE INDEX idx_metric_name ON raw_metrics (metric_name, timestamp)
    `);

    //CREATE TABLE IF NOT EXISTS ${_globalThis.app_location === 'local' ? 'memory.': ''}aggregate_metrics (
    await conn.run(`
      CREATE TABLE IF NOT EXISTS aggregate_metrics (
        metric_name VARCHAR NOT NULL,
        aggregate_bucket VARCHAR NOT NULL, -- '1minute', '5minute', '15minute', '1hour', '3hour', '12hour', '1day', '3day', '1week', '2week', '1month', '3month', '6month', '1year'
        start_time TIMESTAMP_MS NOT NULL, -- ms
        end_time TIMESTAMP_MS NOT NULL,
        count INTEGER NOT NULL,
        min_value DOUBLE,
        max_value DOUBLE,
        mean_value DOUBLE,
        p95_value DOUBLE,
        sum_value DOUBLE,
        PRIMARY KEY (metric_name, aggregate_bucket, start_time)
      )
    `);

    try {
      await conn.run(`ALTER TABLE aggregate_metrics ADD COLUMN sum_value DOUBLE`);
    } catch (error) {}

    //ON ${_globalThis.app_location === 'local' ? 'memory.': ''}aggregate_metrics (metric_name, aggregate_bucket, start_time DESC)
    await conn.run(`
      CREATE INDEX IF NOT EXISTS idx_metric_name_aggregate_bucket_start_time
      ON aggregate_metrics (metric_name, aggregate_bucket, start_time DESC)
    `);

    await conn.run(`
      CREATE TABLE IF NOT EXISTS escalations (
        metric_name VARCHAR NOT NULL UNIQUE,
        reason_for_escalation VARCHAR NOT NULL,
        timestamp TIMESTAMP_MS NOT NULL
      )
    `);
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {} // Eat.
  }
}

export const insertMetricDataPoint = async (metricDataPoint: iface.IMetricDataPoint) => {
  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    if (metricDataPoint.metricMetadata) {
      //await conn.run(`INSERT INTO ${_globalThis.app_location === 'local' ? 'memory.': ''}raw_metrics (metric_name, metric_type, value, timestamp, metadata) VALUES (?, ?, ?, make_timestamp_ms(${metricDataPoint.timestamp.getTime()}), ?::JSON)`, [
      await conn.run(`
        INSERT INTO raw_metrics (metric_name, metric_type, value, timestamp, metadata)
        VALUES (?, ?, ?, make_timestamp_ms(${metricDataPoint.timestamp.getTime()}), ?::JSON)`, [
          metricDataPoint.metricName,
          metricDataPoint.metricType,
          metricDataPoint.metricValue,
          JSON.stringify(metricDataPoint.metricMetadata)
        ]
      );
    } else {
      //await conn.run(`INSERT INTO ${_globalThis.app_location === 'local' ? 'memory.': ''}raw_metrics (metric_name, metric_type, value, timestamp) VALUES (?, ?, ?, make_timestamp_ms(${metricDataPoint.timestamp.getTime()}))`, [
      await conn.run(`
        INSERT INTO raw_metrics (metric_name, metric_type, value, timestamp)
        VALUES (?, ?, ?, make_timestamp_ms(${metricDataPoint.timestamp.getTime()}))`
        , [
          metricDataPoint.metricName,
          metricDataPoint.metricType,
          metricDataPoint.metricValue
        ]
      );
    }
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {} // Eat.
  }
}

export const insertOrUpdateEscalation = async (metricName: string, reasonForEscalation: string) => {
  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    await conn.run(`
      INSERT INTO escalations (metric_name, reason_for_escalation, timestamp)
      VALUES (?, ?, make_timestamp_ms(${Date.now()}))
      ON CONFLICT (metric_name)
      DO UPDATE SET
        reason_for_escalation = EXCLUDED.reason_for_escalation,
        timestamp = EXCLUDED.timestamp
    `, [metricName, reasonForEscalation]
    );
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {}
  }
};

export const getEscalations = async (): Promise<{ metricName: string; reasonForEscalation: string; timestamp: Date }[]> => {
  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    const result = await conn.run(`SELECT metric_name, reason_for_escalation, timestamp FROM escalations`);

    const rows = await result.getRowObjects();

    return rows.map((row): { metricName: string; reasonForEscalation: string; timestamp: Date } => ({
      metricName: row.metric_name as string,
      reasonForEscalation: row.reason_for_escalation as string,
      timestamp: toDate(row.timestamp)
    }));
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {}
  }
};

export const getRawMetricNames = async (): Promise<string[]> => {
  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    //FROM ${_globalThis.app_location === 'local' ? 'memory.': ''}raw_metrics
    const result = await conn.run(`
      SELECT DISTINCT metric_name
      FROM raw_metrics
      ORDER BY metric_name ASC
    `);

    return (await result.getRows()).map(row => row.toString());
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {}
  }
};

export const getAllRawMetrics = async () => { // Used for testing.
  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    //FROM ${_globalThis.app_location === 'local' ? 'memory.': ''}raw_metrics
    const result = await conn.run(`
      SELECT *
      FROM raw_metrics
      ORDER BY timestamp ASC
    `);

    const rows = await result.getRows();

    return rows;
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {} // Eat.
  }
};

export const getLastHoursRawMetrics = async (metricName: string): Promise<iface.IMetricDataPoint[]> => {
  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    //FROM ${_globalThis.app_location === 'local' ? 'memory.': ''}raw_metrics
    const result = await conn.run(`
      SELECT *
      FROM raw_metrics
      WHERE
        metric_name = ?
        AND timestamp::TIMESTAMPTZ >= CURRENT_TIMESTAMP - INTERVAL 1 HOUR
      ORDER BY timestamp ASC
      LIMIT 100
    `, [metricName]);

    const rows = await result.getRowObjects();

    return rows.map((row): iface.IMetricDataPoint => ({
      metricName: row.metric_name as string,
      metricValue: row.value as number,
      metricType: row.metric_type as 'count' | 'table',
      timestamp: toDate(row.timestamp),
      metricMetadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
    }));
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {} // Eat.
  }
};

const toDate = (storedValue: unknown): Date => {
  if (storedValue instanceof DuckDBTimestampMillisecondsValue) {
    return new Date(Number(storedValue.millis)); // BIGINT to Number to Date.
  }
  if (storedValue instanceof Date) { return storedValue };

  throw new Error(`Unexpected timestamp type: ${typeof storedValue}`);
}

export const aggregateMetrics = async (now: number) => {
  console.trace('aggregateMetrics', aggregateMetrics);

  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    const metricNamesResult = await conn.run(`
      SELECT DISTINCT metric_name FROM raw_metrics
    `);
    const metricNames = (await metricNamesResult.getRows()).map(row => row[0] as string);

    for (const metricName of metricNames) {
      for (const [window, durationMs] of Object.entries(iface.aggregateWindowDurationMs) as [iface.MetricAggregateWindow, number][]) {
        const windowStart = Math.floor(now / durationMs) * durationMs;
        const windowEnd = windowStart + durationMs;

        // Pull raw metrics within this window for this metric.
        const rawResult = await conn.run(`
          SELECT value
          FROM raw_metrics
          WHERE
            metric_name = ?
            AND timestamp >= make_timestamp_ms(${windowStart})
            AND timestamp < make_timestamp_ms(${windowEnd})
        `, [metricName]);

        const rows = await rawResult.getRows();
        if (!rows.length) { continue; }

        const values = rows.map(r => r[0] as number);
        const sorted = [...values].sort((a, b) => a - b);

        const count = values.length;
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const sum = values.reduce((a, b) => a + b, 0);
        const mean = sum / count;
        const p95 = sorted[Math.floor(sorted.length * 0.95)];

        const sumMetric = iface.isSumAggregatedMetric(metricName);

        // Upsert the aggregate bucket.
        await conn.run(`
          INSERT INTO aggregate_metrics (metric_name, aggregate_bucket, start_time, end_time, count, min_value, max_value, mean_value, p95_value, sum_value)
          VALUES (?, ?, make_timestamp_ms(${windowStart}), make_timestamp_ms(${windowEnd}), ?, ?, ?, ?, ?, ?)
          ON CONFLICT (metric_name, aggregate_bucket, start_time)
          DO UPDATE SET
            end_time = EXCLUDED.end_time,
            count = EXCLUDED.count,
            min_value = EXCLUDED.min_value,
            max_value = EXCLUDED.max_value,
            mean_value = EXCLUDED.mean_value,
            p95_value = EXCLUDED.p95_value,
            sum_value = EXCLUDED.sum_value
        `, [metricName, window, count, min, max, mean, p95, sumMetric ? sum : null]);
      }
    }
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {} // Eat.
  }
}

export const pruneOldRawData = async (now: number) => {
  console.trace('pruneOldRawData', pruneOldRawData);

  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  const cutoff = now - iface.rawMetricsRetentionMs;

  try {
    await conn.run(`
      DELETE FROM raw_metrics
      WHERE timestamp < make_timestamp_ms(${cutoff})
    `);
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {} // Eat.
  }
}

export const pruneOldAggregateData = async (now: number) => {
  console.trace('pruneOldAggregateData', pruneOldAggregateData);

  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    for (const [window, retentionMs] of Object.entries(iface.aggregateWindowRetentionMs) as [iface.MetricAggregateWindow, number][]) {
      const cutoff = now - retentionMs;
      await conn.run(`
        DELETE FROM aggregate_metrics
        WHERE aggregate_bucket = ? AND start_time < make_timestamp_ms(${cutoff})
      `, [window]);
    }
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {} // Eat.
  }
}

export const getAggregateMetricsForWindow = async (metricName: string, window: iface.MetricAggregateWindow): Promise<iface.IMetricDataPoint[]> => {
  const db = await getDb();
  if (!conn) { conn = await db.connect(); }

  try {
    const result = await conn.run(`
      SELECT metric_name, mean_value, sum_value, start_time
      FROM aggregate_metrics
      WHERE metric_name = ? AND aggregate_bucket = ?
      ORDER BY start_time DESC
      LIMIT 100
    `, [metricName, window]);

    const rows = (await result.getRowObjects()).reverse();

    const sumMetric = iface.isSumAggregatedMetric(metricName);

    return rows.map((row): iface.IMetricDataPoint => ({
      metricName: row.metric_name as string,
      metricValue: (sumMetric ? row.sum_value : row.mean_value) as number,
      metricType: 'count',
      timestamp: toDate(row.start_time),
    }));
  } finally {
    // try {
    //   conn.closeSync();
    // } catch (error) {} // Eat.
  }
};

export const closeDb = async () => {
  const db = await getDb();

  try {
    db.closeSync();
  } catch (error) {} // Eat.
}
