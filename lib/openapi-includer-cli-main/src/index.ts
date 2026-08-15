#!/usr/bin/env node
import { argparser } from './argparser';
import OpenAPIYAMLFileGenerator from './OpenAPIYAMLFileGenerator';

new OpenAPIYAMLFileGenerator(argparser.args['absolute-input-openapi-def-path'], argparser.args['absolute-output-openapi-def-path']);