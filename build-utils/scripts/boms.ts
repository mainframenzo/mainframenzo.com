// This file is responsible for handling BOM build logic for (blog) posts.
import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import * as fs from 'node:fs';
import * as path from 'node:path';
import { parse  } from 'csv-parse';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ejs = require('ejs');

import * as iface from './iface';

export const generateHTML = async (_postInfo: iface.IPostInfo, bom: iface.IBOMMarkdownReference): Promise<[string, number]> => {
  const templateString = fs.readFileSync(path.join(process.cwd(), `src/frontend/templates.partials/bom.ejs`), 'utf-8');
  log.debug('bom templateString', templateString, bom);

  const materials = await getMaterialsList(bom);
  log.debug('bom materials', materials);

  let totalCostUSD = 0;
  materials.forEach(material => { totalCostUSD = material.costUSD + totalCostUSD; });
  log.debug('totalCostUSD', totalCostUSD);

  const templateData: Record<string, any> = {};
  templateData['materials'] = materials;
  templateData['totalCostUSD'] = totalCostUSD.toFixed(2);

  return [ejs.render(templateString, templateData), totalCostUSD];
}

export const getMaterialsList = async (bom: iface.IBOMMarkdownReference): Promise<iface.IMaterial[]> => {
  log.trace('getMaterialsList', bom);

  const bomFile = path.join(process.cwd(), `src/frontend/boms/posts/${bom.name}`);
  log.debug('bomFile', bomFile);

  const fileContents = await fs.readFileSync(bomFile).toString();
  log.debug('fileContents', fileContents);

  const csvParser = parse(fileContents, { delimiter: ',' });

  let headerRowSkipped = false;

  return new Promise((resolve, reject) => {
    const materials: iface.IMaterial[] = [];
    let failedToParseCsv = false;

    csvParser.on('readable', function () {
      let record;
      while ((record = csvParser.read()) !== null) {
        log.debug('bom record', record);

        if (!headerRowSkipped) {
          headerRowSkipped = true;
          
          continue;
        }

        materials.push({ 
          quantity: Number(record[0]),
          type: record[1], 
          file: record[2],
          description: record[3],
          name: record[4],
          link: record[5],
          costUSD: Number(record[6]) || 0,
          notes: record[7]
        });
      }
    });
    csvParser.on('error', (error) => {
      log.error('failed to parse csv', error);
      failedToParseCsv = true;
    });
    csvParser.on('end', () => {
      if (failedToParseCsv) { return reject(); }
      
      return resolve(materials);
    });
  });
}