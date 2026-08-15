#! node
// This file is responsible for compiling EJS templates to HTML.
import _globalThis from '../../src/@types/global-this';

import * as fs from 'node:fs';
import * as path from 'node:path';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ejs = require('ejs');

import { argparser } from './build-html.argparser';

import * as constants from './constants';
import * as iface from './iface';
import * as posts from './posts';
import * as bookmarks from './bookmarks';
//import { generateScriptCspHashes } from './build-script-hashes';

const compileToHTML = (
  thingsivemade: Array<iface.IPost>,
  musings: Array<iface.IPost>,
  software: Array<iface.IPost>,
  drawings: Array<iface.IPost>,
  vehicles: Array<iface.IPost>,
  playlists: Array<iface.IPost>,
  initialTemplateData: iface.IInitialTemplateData
): Array<iface.IHTMLTemplate> => {
  console.trace('compileToHTML', posts, musings, software, drawings, vehicles, playlists, initialTemplateData);

  const allPosts = [
    ...thingsivemade,
    ...musings,
    ...software,
    ...drawings,
    ...vehicles,
    ...playlists
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
      playlists,
      initialTemplateData,
      htmlTemplate
    );

    console.debug(`saving compiled ${htmlTemplate.path} to ${htmlTemplate.htmlPath}`);

    fs.writeFileSync(htmlTemplate.htmlPath!, html);

    return htmlTemplate;
  });
};

const addStaticPageHTMLTemplates = (dir: string, htmlTemplates: Array<iface.IHTMLTemplate>) => {
  console.trace('addStaticPageHTMLTemplates', dir, htmlTemplates);

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const childPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      addStaticPageHTMLTemplates(childPath, htmlTemplates);

      continue;
    }

    if (isDynamicPageTemplate(entry)) {
      console.warn('dynamic ejs template (post), ignoring');

      continue;
    }

    if (!isPageTemplate(path, childPath)) {
      console.warn('not ejs template, ignoring');

      continue;
    }

    const templateFolder = dir.split('/').slice(-1)[0];
    console.debug('templateFolder', templateFolder, 'entry.name', entry.name);

    const templatePath = path.join(dir, entry.name);
    console.debug(`adding page html template: ${templatePath}`);

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
  console.trace('getPageHTMLTemplate', templatePath, templateName);

  const htmlPath = `${constants.frontendDistDir}/${templateName}`.replace(constants.templateExtension, '.html');

  return { name: templateName, path: templatePath, htmlPath };
};

const addPostPageHTMLTemplates = (posts: Array<iface.IPost>, htmlTemplates: Array<iface.IHTMLTemplate>) => {
  console.trace('addPostPageHTMLTemplates');

  posts.forEach((post) => {
    const htmlPath = `${constants.frontendDistDir}/posts/${post.postInfo.title}.html`;

    console.debug(`adding ${post.postInfo.type} post page html template: ${htmlPath}`);

    htmlTemplates.push({ post, name: constants.postTemplateName, path: constants.postTemplateHTMLPath, htmlPath, id: new iface.PostTemplateId(post.postInfo.title!) });
  });
};

const compileHTMLTemplate = (
  posts: Array<iface.IPost>,
  musings: Array<iface.IPost>,
  software: Array<iface.IPost>,
  drawings: Array<iface.IPost>,
  vehicles: Array<iface.IPost>,
  playlists: Array<iface.IPost>,
  initialTemplateData: iface.IInitialTemplateData,
  htmlTemplate: iface.IHTMLTemplate
) => {
  if (htmlTemplate.id instanceof iface.PostTemplateId) {
    console.debug(`compiling post page html template ${htmlTemplate.path}`);
  } else {
    console.debug(`compiling page html template ${htmlTemplate.path}`);
  }

  const templateString = fs.readFileSync(`${htmlTemplate.path}`, 'utf-8');
  const templateData = getTemplateData(
    posts,
    musings,
    software,
    drawings,
    vehicles,
    playlists,
    initialTemplateData,
    htmlTemplate
  );
  console.debug('templateString', templateString, 'templateData', templateData);

  const html = ejs.render(templateString, templateData);

  return html;
};

const getTemplateData = (
  posts: Array<iface.IPost>,
  musings: Array<iface.IPost>,
  software: Array<iface.IPost>,
  drawings: Array<iface.IPost>,
  vehicles: Array<iface.IPost>,
  playlists: Array<iface.IPost>,
  initialTemplateData: iface.IInitialTemplateData,
  htmlTemplate: iface.IHTMLTemplate
): iface.IHTMLTemplateData => {
  const templateData: iface.IHTMLTemplateData = {
    locals: {}, // FIXME functions?
    ...initialTemplateData,
    isPostPage: false,
    posts,
    musings,
    software,
    drawings,
    vehicles,
    playlists
  };

  if (htmlTemplate.id instanceof iface.PostTemplateId) {
    templateData.isPostPage = true;
    templateData.post = htmlTemplate.post;
  }

  return templateData;
};

const app_stage = argparser.args['app-stage'] as iface.TAppStage;
const publish_stage = argparser.args['publish-stage'] as iface.TPublishStage;
const app_location = argparser.args['app-location'] as iface.TAppLocation;

const weWant: iface.TPostFilter = publish_stage === 'dev' ? 'all' : 'published';

// FIXME Probably can get rid of "post type" and just say getAll(weWant).
compileToHTML(
  await posts.getAll(weWant, '#thingsivemade'),
  await posts.getAll(weWant, '#musing'),
  await posts.getAll(weWant, '#software'),
  await posts.getAll(weWant, '#drawing'),
  await posts.getAll(weWant, '#vehicle'),
  await posts.getAll(weWant, '#playlist'), {
    app_stage,
    publish_stage,
    app_location,
    api_url: _globalThis.api_url,
    // Bookmarks are their own template, but you still require their data when compiling.
    // FIXME Not sure if there is a better place to do this?
    bookmarks: bookmarks.getBookmarks(),
    // FIXME No longer needed with vite?
    //scripts_with_csp_hashes: await generateScriptCspHashes(appLocation)
  });
