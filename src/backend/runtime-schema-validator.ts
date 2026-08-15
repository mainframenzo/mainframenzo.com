// This file is responsible for validating our YAML-based schemas at runtime.
import Ajv from 'ajv';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { globby } from 'globby';

const ajv = new Ajv({ allErrors: true });
ajv.addKeyword('example');

const schemaCache: Map<string, object> = new Map();

export const loadSchemas = async () => {
  console.trace('loadSchemas');

  const filePaths = await globby([`${openApiDefDir}/*.schema.yaml`]);
  console.debug('filePaths', filePaths);

  for (const filePath of filePaths) {
    await loadSchema(filePath);
  }
}

const openApiDefDir = `${process.cwd()}/src/openapi-def`;

const loadSchema = async (filePath: string): Promise<object> => {
  if (schemaCache.has(filePath)) { return schemaCache.get(filePath)!; }

  const schema = yaml.load(fs.readFileSync(filePath, 'utf8')) as object;
  
  schemaCache.set(filePath, schema);

  return schema;
}

export const validateSchema = async <T,>(schemaFileName: string, data: unknown): Promise<T> => {
  const schema = await loadSchema(`${openApiDefDir}/${schemaFileName}`);

  if (!schema) { throw new Error(`can not load schema file: ${schemaFileName}`); }

  console.debug('validating schema', schemaFileName, schema, Array.isArray(data), data);

  const validate = ajv.compile(schema);

  let valid = false;
  if (Array.isArray(data)) { // Often you pass an array of data where each entry is the schema. 
    console.debug('validating array item');

    for (const item of data) {
      console.debug('validating array item using schema', schemaFileName, schema, item);

      valid = validate(item);

      if (!valid) { break; }
    }
  } else {
    console.debug('validating non-array item');

    valid = validate(data);
  }

  if (!valid) { throw new Error(`data is invalid for schema: ${schemaFileName}`); }

  return data as T;
}