// This file has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
import * as cdk from 'aws-cdk-lib';

const getValidContext = (app: cdk.App, contextKey: string, shouldExit?: boolean): string | undefined => {
  const context = app.node.tryGetContext(contextKey);

  if (!context && shouldExit !== undefined && shouldExit === true) {
    console.error(`No ${contextKey} provided in context runtime.`);
    process.exit(1);
  }

  // Sanitize user input.
  if (context) { return (context as string).trim(); }

  return;
}

export { getValidContext }