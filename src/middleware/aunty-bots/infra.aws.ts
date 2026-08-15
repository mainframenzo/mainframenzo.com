// This file has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
//
// This file is responsible for defining our aunty-bot middleware as an Amazon CloudFront function.
// See ./readme.md for details.
import * as AWSCloudFrontFunction from 'AWSCloudFrontFunction';

// @ts-ignore CloudFront expects this format and this format only. No "export const handler = () => {" etc.
function handler(
  event: AWSCloudFrontFunction.Event,
): AWSCloudFrontFunction.Request | AWSCloudFrontFunction.Response {
  const headers = event.request.headers;

  if (
    !headers['user-agent'] || 
    (
      headers['user-agent'] && headers['user-agent'].value === undefined ||
      headers['user-agent'] && headers['user-agent'].value === null ||
      headers['user-agent'] && headers['user-agent'].value === '' ||
      headers['user-agent'] && headers['user-agent'].value === '__EMPTY__'
    ) 
  ) {
    console.log('user-agent header is missing or empty, fuck off');
    
    return fuckOff();   
  }

  // This is no longer needed. You had to assume every 404/403 was malicious (sucks),
  //  but it makes it so that /<route>.php gets redirected to John Connor.
  // You kept this here as a backup in a case you mess up AWS resource config.
  try {
    if (event.request.uri.split('.').pop() === 'php') {
      console.log('php route requested, fuck off');

      return fuckOff();
    }
  } catch (error) {} // Eat.

  // This is no longer needed. You had to assume every 404/403 was malicious (sucks),
  //  but it makes it so that /<anynonpopularroute>.html gets redirected to John Connor.
  // You kept this here as a backup in a case you mess up AWS resource config.
  try {
    if (popularBadActorRoutes.includes(event.request.uri)) {
      console.log('popular bad actor route requested, fuck off');

      return fuckOff();
    }
  } catch (error) {} // Eat.

  return event.request;
}

const fuckOff = () => {
  return {
    statusCode: 308, // Also, set the status code as permanent - nothing to see here, not the droids you are looking for.
    statusDescription: 'Permanent Redirect',
    headers: {
      location: { value: 'https://mainframenzo.github.io/john-connor' }
    }
  };
}

// Rather than make a list of all the files our website contains (huge!),
//  use the metrics AWS provides to make a list of regularly requested routes,
//  most of which are not folks viewing your silly blog, but bad actors poking around...lol.
// Many of the requests are for .php files, which are not included in this list -
//  you're just blanket redirecting any request for a .php file to your endless redirect loop.
// Keep updated as necessary.
const popularBadActorRoutes = [
  '/phpinfo',
  '/info',
  '/login',
  '/api/.env',
  '/admin/.env',
  '/.git/HEAD',
  '/.env.prod',
  '/.env.example',
  '/_profiler/phpinfo',
  '/.env',
  '/test',
  '/docker-compose.yml',
  '/.git/config',
  '/settings.json',
  '/server.js',
  '/main.js',
  '/frontend_dev.php/$',
  '/docs/deployment.md',
  '/debug/default',
  '/config/test.json',
  '/config/services.yaml',
  '/config/config.json',
  '/config/config.js',
  '/config/aws.json',
  '/config/application.yml',
  '/config.json',
  '/appsettings.json',
  '/appsettings.Production.json',
  '/apps/.env',
  '/application.properties',
  '/app_dev.php/_profiler/phpinfo',
  '/app/routes.py',
  '/app/.env',
  '/app.js'
];