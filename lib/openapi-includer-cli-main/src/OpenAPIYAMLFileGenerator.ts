import fs from 'fs';
import path from 'path';

import yaml from 'yaml';
import { flatten, unflatten } from 'flat';
import merge from 'ts-deepmerge';

export default class OpenAPIYAMLFileGenerator {
  private basePath: string;

  constructor(absoluteInputPath: string, absoluteOutputPath: string) {
    console.debug(absoluteInputPath, absoluteOutputPath);

    if (!path.isAbsolute(absoluteInputPath)) { throw Error(`${absoluteInputPath} is not absolute.`); }
    if (!path.isAbsolute(absoluteOutputPath)) { throw Error(`${absoluteOutputPath} is not absolute.`); }

    this.basePath = path.dirname(absoluteInputPath);
    console.debug('basePath', this.basePath);

    const inputFile = fs.readFileSync(absoluteInputPath, 'utf8');
    const inputYAML = yaml.parse(inputFile);
    const flattenedYAML = flatten(inputYAML);
    console.debug('flattenedYAML', JSON.stringify(flattenedYAML, null, 2));

    const modifiedFlattenedYAML = JSON.parse(JSON.stringify(flattenedYAML));

    Object.keys(modifiedFlattenedYAML).forEach((key: string) => {
      if (key.includes('$includes')) { 
        const returnedYAML = this._tryResolveInclude(modifiedFlattenedYAML[key], { parentFile: absoluteInputPath, key }); 

        const newKey = key.split('.$includes')[0];
        delete modifiedFlattenedYAML[key];

        if (modifiedFlattenedYAML[newKey]) {
          modifiedFlattenedYAML[newKey] = merge(modifiedFlattenedYAML[newKey], returnedYAML);
        } else {
          modifiedFlattenedYAML[newKey] = returnedYAML;
        }

        console.debug(`Deleting ${key} and upserting yaml to ${newKey}`, JSON.stringify(returnedYAML, null, 2));
      }
    });

    fs.writeFileSync(absoluteOutputPath, yaml.stringify(unflatten(modifiedFlattenedYAML)));
  }

  private _tryResolveInclude($include: string, args?: { parentFile?: string; key?: string; }) {
    console.debug('_tryResolveInclude', $include, 'parentFile', args?.parentFile, 'key', args?.key);

    let includePath = path.basename($include);
    if (!path.isAbsolute($include)) { 
      if ($include.startsWith('./')) {
        includePath = $include.replace('./', '');
      } else if ($include.startsWith('.')) {
        includePath = $include.replace('.', '');
      }
    }

    const absolutePathToInclude = `${this.basePath}/${includePath}`;
    const inputFile = fs.readFileSync(absolutePathToInclude, 'utf8');
    const inputYAML = yaml.parse(inputFile);
    const flattenedYAML: any = flatten(inputYAML);
    console.debug('flattenedYAML', JSON.stringify(flattenedYAML, null, 2));

    const modifiedFlattenedYAML: any = JSON.parse(JSON.stringify(flattenedYAML));
    
    Object.keys(flattenedYAML).forEach((key: string) => {
      if (key.includes('$includes')) { 
        const returnedYAML = this._tryResolveInclude(flattenedYAML[key], { parentFile: absolutePathToInclude, key });
  
        const newKey = key.split('.$includes')[0];
        delete modifiedFlattenedYAML[key];

        if (modifiedFlattenedYAML[newKey]) {
          modifiedFlattenedYAML[newKey] = merge(modifiedFlattenedYAML[newKey], returnedYAML);
        } else {
          modifiedFlattenedYAML[newKey] = returnedYAML;
        }

        console.debug(`Deleting ${key} and upserting yaml to ${newKey}`, JSON.stringify(returnedYAML, null, 2));
      }
    });

    return unflatten(modifiedFlattenedYAML);
  }
}