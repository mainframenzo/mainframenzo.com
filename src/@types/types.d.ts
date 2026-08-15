// This file is responsible for declaring types for any JavaScript packages.
// References: 
// * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/aws-cloudfront-function/aws-cloudfront-function-tests.ts

// This code has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
declare module 'AWSCloudFrontFunction' {
  export interface Event {
    version: '1.0';
    context: Context;
    viewer: Viewer;
    request: Request;
    response: Response;
  }

  export interface Context {
    distributionDomainName: string;
    distributionId: string;
    eventType: 'viewer-request' | 'viewer-response';
    requestId: string;
  }

  export interface Viewer {
    ip: string;
  }

  export interface Request {
    method: string;
    uri: string;
    querystring: ValueObject;
    headers: ValueObject;
    cookies: ValueObject;
  }

  export interface Response {
    statusCode: number;
    statusDescription?: string;
    headers?: ValueObject;
    cookies?: ResponseCookie;
  }

  export interface ValueObject {
    [name: string]: {
      value: string;
      multiValue?: Array<{
          value: string;
      }>;
    };
  }

  export interface ResponseCookie {
    [name: string]: {
      value: string;
      attributes: string;
      multiValue?: Array<{
        value: string;
        attributes: string;
      }>;
    };
  }

  export * from 'AWSCloudFrontFunction';
}