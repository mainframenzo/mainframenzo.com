// This file is responsible for defining build script constants.
import * as path from 'path';

export const templateExtension: string = '.ejs';
export const postExtension: string = '.md';
export const dynamicPagePrefix: string = '_';

export const postsDir: string =  path.join(process.cwd(), 'src/frontend/posts');
export const pagesDir: string = path.join(process.cwd(), 'src/frontend/templates.pages');
export const postTemplateName: string = `${dynamicPagePrefix}post.ejs`;
export const postTemplateHTMLPath: string = `${pagesDir}/${postTemplateName}`;
export const frontendDistDir: string = path.join(process.cwd(), 'dist.frontend');