// This file has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
//
// This file is responsible for defining our locally-hosted middleware function.
// FIXME Need to add to local development runner.
import { onResourceRequest } from '../../dist.middleware.aunty-bots/infra_aws_bundle_importified.mjs';

export default class LocalAmazonCloudFrontFunctionMiddleware {
  middleware (config) {
    console.debug('config', config);

    return async (requestContext, next) => {
      console.debug('requestContext', requestContext);

      const uri = requestContext.request.url.indexOf('?') !== -1 ? requestContext.url.split('?')[0] : requestContext.request.url;
      const querystring = requestContext.request.url.indexOf('?') !== -1 ? requestContext.request.url.split('?')[1] : undefined;

      // Call our middleware function.
      const updatedRequest = await onResourceRequest({
        Records: [{
          cf: {
            request: {
              method: requestContext.request.method,
              uri,
              body: requestContext.request.body,
              querystring
            }
          }
        }]
      });
      console.debug('updatedRequest', updatedRequest);

      /* FIXME
      if (updatedRequest && updatedRequest.status) {
        requestContext.response.status = updatedRequest.status;
      }
      */

      if (updatedRequest && updatedRequest.body) {
        requestContext.response.body = updatedRequest.body;
      }

      await next();
    }
  }
}