// This file is responsible for handling 3d slideshow build logic for (blog) posts.
import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import * as fs from 'node:fs';
import * as path from 'node:path';
import { parse } from 'yaml';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ejs = require('ejs');

import * as iface from './iface';

export const generateHTML = async (_postInfo: iface.IPostInfo, threedSlideshow: iface.ISlideshowMarkdownReference): Promise<string> => {
  const templateString = fs.readFileSync(path.join(process.cwd(), `src/frontend/templates.partials/3d-slideshow.ejs`), 'utf-8');
  log.debug('3d slideshow templateString', templateString, threedSlideshow);

  const slides = await (await getSlideshowSlides(threedSlideshow)).map(slide => {
    slide.filePath = slide.filePath.replace('./src/frontend/public', '');
    if (slide.thumbnailPath) { slide.thumbnailPath = slide.thumbnailPath.replace('./src/frontend/public', ''); }

    return slide;
  });
  const slideshowId = threedSlideshow.name.replace('.yaml', '-threed'); // Derive from file name.
  log.debug('3d slideshow slides', slideshowId, slides);

  const templateData: Record<string, any> = {};
  templateData['slideshowId'] = slideshowId;
  templateData['slides'] = slides;

  return ejs.render(templateString, templateData);
}

export const getSlideshowSlides = async (threedSlideshow: iface.ISlideshowMarkdownReference): Promise<iface.ISlideshowSlide[]> => {
  const threedSlideshowFile = path.join(process.cwd(), `src/frontend/3d-slideshows/posts/${threedSlideshow.name}`);
  log.debug('threedSlideshowFile', threedSlideshowFile);

  const threedSlideshowSlides = parse(fs.readFileSync(threedSlideshowFile).toString()) as iface.ISlideshowSlide[];
  log.debug('threedSlideshowSlides', threedSlideshowSlides);

  return threedSlideshowSlides;
}