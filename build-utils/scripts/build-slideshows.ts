// This file is responsible for handling build slideshow build logic for (blog) posts.
import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import * as fs from 'node:fs';
import * as path from 'node:path';
import { parse } from 'yaml';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ejs = require('ejs');

import * as iface from './iface';

export const generateHTML = async (_postInfo: iface.IPostInfo, buildSlideshow: iface.ISlideshowMarkdownReference): Promise<string> => {
  const templateString = fs.readFileSync(path.join(process.cwd(), `src/frontend/templates.partials/build-slideshow.ejs`), 'utf-8');
  log.debug('build slideshow templateString', templateString, buildSlideshow);

  const slides = await (await getSlideshowSlides(buildSlideshow)).map(slide => {
    slide.filePath = slide.filePath.replace('./src/frontend/public', '');
    if (slide.thumbnailPath) { slide.thumbnailPath = slide.thumbnailPath.replace('./src/frontend/public', ''); }
    
    return slide;
  });
  const slideshowId = buildSlideshow.name.replace('.yaml', '-build'); // Derive from file name.
  log.debug('build slideshow slides', slideshowId, slides);

  const templateData: Record<string, any> = {};
  templateData['slideshowId'] = slideshowId;
  templateData['slides'] = slides;

  return ejs.render(templateString, templateData);
}

export const getSlideshowSlides = async (buildSlideshow: iface.ISlideshowMarkdownReference): Promise<iface.ISlideshowSlide[]> => {
  const buildSlideshowFile = path.join(process.cwd(), `src/frontend/build-slideshows/posts/${buildSlideshow.name}`);
  log.debug('buildSlideshowFile', buildSlideshowFile);

  const buildSlideshowSlides = parse(fs.readFileSync(buildSlideshowFile).toString()) as iface.ISlideshowSlide[];
  log.debug('buildSlideshowSlides', buildSlideshowSlides);

  return buildSlideshowSlides;
}