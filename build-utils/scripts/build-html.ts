#! node
// This file is responsible for compiling EJS templates to HTML.
import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import * as fs from 'node:fs';
import * as path from 'node:path';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ejs = require('ejs');

import { argparser } from './build-html.argparser';

import * as constants from './constants';
import * as iface from './iface';
import * as posts from './posts';
import { generateScriptCspHashes } from './build-script-hashes';

const compileToHTML = (
  thingsivemade: Array<iface.IPost>, 
  musings: Array<iface.IPost>, 
  software: Array<iface.IPost>, 
  drawings: Array<iface.IPost>, 
  vehicles: Array<iface.IPost>,
  recordings: Array<iface.IPost>, 
  initialTemplateData: iface.IInitialTemplateData
): Array<iface.IHTMLTemplate> => {
  log.trace('compileToHTML', posts, musings, software, drawings, vehicles, recordings, initialTemplateData);

  const allPosts = [
    ...thingsivemade,
    ...musings, 
    ...software,
    ...drawings, 
    ...vehicles,
    ...recordings
  ];

  const htmlTemplates: Array<iface.IHTMLTemplate> = [];

  addStaticPageHTMLTemplates(constants.pagesDir, htmlTemplates);
  addPostPageHTMLTemplates(allPosts, htmlTemplates);

  return htmlTemplates.map((htmlTemplate: iface.IHTMLTemplate) => {
    const html = compileHTMLTemplate(
      thingsivemade,
      musings, 
      software, 
      drawings, 
      vehicles,
      recordings, 
      initialTemplateData, 
      htmlTemplate
    );

    log.debug(`saving compiled ${htmlTemplate.path} to ${htmlTemplate.htmlPath}`);
    
    fs.writeFileSync(htmlTemplate.htmlPath!, html);

    return htmlTemplate;
  });
};

const addStaticPageHTMLTemplates = (dir: string, htmlTemplates: Array<iface.IHTMLTemplate>) => {
  log.trace('addStaticPageHTMLTemplates', dir, htmlTemplates);

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const childPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      addStaticPageHTMLTemplates(childPath, htmlTemplates);

      continue;
    }

    if (isDynamicPageTemplate(entry)) {
      log.warn('dynamic ejs template (post), ignoring');

      continue;
    }

    if (!isPageTemplate(path, childPath)) {
      log.warn('not ejs template, ignoring');

      continue;
    }

    const templateFolder = dir.split('/').slice(-1)[0];
    log.debug('templateFolder', templateFolder, 'entry.name', entry.name);

    const templatePath = path.join(dir, entry.name);
    log.debug(`adding page html template: ${templatePath}`);
    
    htmlTemplates.push(getPageHTMLTemplate(templatePath, entry.name));
  }
};

const isDynamicPageTemplate = (entry: any): boolean => {
  if (entry.name.startsWith('_')) {
    return true;
  }

  return false;
}

const isPageTemplate = (path: any, childPath: string): boolean => {
  if (path.extname(childPath) === constants.templateExtension) {
    return true;
  }

  return false;
}

const getPageHTMLTemplate = (templatePath: string, templateName: string): iface.IHTMLTemplate => {
  log.trace('getPageHTMLTemplate', templatePath, templateName);

  const htmlPath = `${constants.frontendDistDir}/${templateName}`.replace(constants.templateExtension, '.html');

  return { name: templateName, path: templatePath, htmlPath };
};

const addPostPageHTMLTemplates = (posts: Array<iface.IPost>, htmlTemplates: Array<iface.IHTMLTemplate>) => {
  log.trace('addPostPageHTMLTemplates');

  posts.forEach((post) => {
    const htmlPath = `${constants.frontendDistDir}/posts/${post.postInfo.title}.html`;

    log.debug(`adding ${post.postInfo.type} post page html template: ${htmlPath}`);

    htmlTemplates.push({ post, name: constants.postTemplateName, path: constants.postTemplateHTMLPath, htmlPath, id: new iface.PostTemplateId(post.postInfo.title!) });
  });
};

const compileHTMLTemplate = (
  posts: Array<iface.IPost>, 
  musings: Array<iface.IPost>, 
  software: Array<iface.IPost>, 
  drawings: Array<iface.IPost>, 
  vehicles: Array<iface.IPost>, 
  recordings: Array<iface.IPost>, 
  initialTemplateData: iface.IInitialTemplateData,
  htmlTemplate: iface.IHTMLTemplate
) => {
  if (htmlTemplate.id instanceof iface.PostTemplateId) {
    log.debug(`compiling post page html template ${htmlTemplate.path}`);
  } else {
    log.debug(`compiling page html template ${htmlTemplate.path}`);
  }

  const templateString = fs.readFileSync(`${htmlTemplate.path}`, 'utf-8');
  const templateData = getTemplateData(
    posts, 
    musings, 
    software, 
    drawings, 
    vehicles,
    recordings, 
    initialTemplateData, 
    htmlTemplate
  );
  log.debug('templateString', templateString, 'templateData', templateData);

  const html = ejs.render(templateString, templateData);

  return html;
};

const getTemplateData = (
  posts: Array<iface.IPost>, 
  musings: Array<iface.IPost>, 
  software: Array<iface.IPost>, 
  drawings: Array<iface.IPost>, 
  vehicles: Array<iface.IPost>, 
  recordings: Array<iface.IPost>,  
  initialTemplateData: iface.IInitialTemplateData, 
  htmlTemplate: iface.IHTMLTemplate
): iface.IHTMLTemplateData => {
  const templateData: iface.IHTMLTemplateData = {
    locals: {}, // TODO functions?
    app_stage: initialTemplateData.appStage,
    publish_stage: initialTemplateData.publishStage,
    app_location: initialTemplateData.appLocation,
    isPostPage: false,
    posts,
    musings,
    software,
    drawings,
    vehicles,
    recordings,
    scripts_with_csp_hashes: initialTemplateData.scripts_with_csp_hashes
  };

  if (htmlTemplate.id instanceof iface.PostTemplateId) {
    templateData.isPostPage = true;
    templateData.post = htmlTemplate.post;
  }

  return templateData;
};

const appStage = argparser.args.stage as iface.TAppStage;
const publishStage = argparser.args['publish-stage'] as iface.TAppPublishStage;
const appLocation = argparser.args['app-location'] as iface.TAppLocation;

const weWant: iface.TPostFilter = publishStage === 'dev' ? 'all' : 'published';

// FIXME Probably can get rid of "post type" and just say getAll(weWant).
compileToHTML(
  await posts.getAll(weWant, '#thingsivemade'), 
  await posts.getAll(weWant, '#musing'),
  await posts.getAll(weWant, '#software'), 
  await posts.getAll(weWant, '#drawings'),
  await posts.getAll(weWant, '#vehicles'),
  await posts.getAll(weWant, '#recordings'), { 
    appStage,
    publishStage,
    appLocation,
    scripts_with_csp_hashes: await generateScriptCspHashes(appLocation)
  });