// This file is responsible for defining an MCP server.
// It gives our LLM access to tools so it can interact with the "real world".
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import * as metricsDb from './metrics.db';

const server = new McpServer({
  name: 'llm-tools',
  version: '1.0.0'
});

server.tool(
  'list_metrics',
  'List metrics available to query.',
  {},
  async () => {
    const rawMetricNames = await metricsDb.getRawMetricNames();

    return {
      content: [{ type: 'text', text: rawMetricNames.join('\n') }]
    };
  }
);

server.tool(
  'get_last_hour_of_metric_values',
  'Get the last hour\'s worth of a metric\'s values.',
  {
    metricName: z.string(),
  },
  async ({ metricName }) => {
    const metricDataPoints = await metricsDb.getLastHoursRawMetrics(metricName);

    return {
      content: [{ type: 'text', text: JSON.stringify(metricDataPoints, null, 2) }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
