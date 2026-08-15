// This file is responsible for generating image srcsets -
//  images in multiple widths and varying formats -
//  which are great for optimizing which image a browser is served.
// You do this because image loading is horribly slow without it.
// This step is done during post build time, so only <image>/<img> tags
//  in the Markdown posts themselves get this functionality (you do not have
//  these issues elsewhere), and the compiled EJS (HTML) has the generated
//  image srcsets.
import * as fs from 'node:fs';
import * as path from 'node:path';
import sharp from 'sharp';

import * as iface from './iface';

export const generateImagesForPostAndModifyPostHtml = async (html: string, resourceDirName: string): Promise<string> => {
  console.trace('generateImagesForPostAndModifyPostHtml', resourceDirName);

  const imageTagMatches = Array.from(html.matchAll(imageTagRegex));
  if (imageTagMatches.length === 0) { return html; } // No images in post.

  const replacements = await Promise.all(
    imageTagMatches.map((match) => processImageTagMatch(match, resourceDirName)),
  );

  let replacementHtml = '';
  let cursor = 0;

  imageTagMatches.forEach((match, index) => {
    const matchStart = match.index ?? 0;

    replacementHtml += html.slice(cursor, matchStart) + replacements[index];
    cursor = matchStart + match[0].length;
  });

  replacementHtml += html.slice(cursor);

  return replacementHtml;
};

const imageTagRegex = /<(image|img)\b([^>]*)>/gi;

// Either returns a <picture> block or the original tag.
const processImageTagMatch = async (imageTagMatch: RegExpMatchArray, resourceDirName: string): Promise<string> => {
  const [fullTag, , attributeString] = imageTagMatch;

  const attributes = parseAttributes(attributeString);
  const src = attributes.get('src');

  if (!src || !src.startsWith('/images/') || attributes.has('srcset')) {
    // Not an image you manage - external URL or already has a srcset - leave.
    // This should honestly never be the case but JIC.
    return fullTag;
  }

  console.debug('processing image', src, 'resourceDirName', resourceDirName);

  let generatedImgSrcset: iface.IImgSrcset | undefined;
  try {
    generatedImgSrcset = await generateSrcsetForImage(src, resourceDirName);
    if (!generatedImgSrcset) {
      return fullTag;
    }
  } catch (error) {
    console.error('failed to generate srcset for image', src, error);

    return fullTag;
  }

  const imgAttributes = new Map(attributes);
  imgAttributes.delete('src');
  imgAttributes.set('src', src); // This is the original image src.
  imgAttributes.set('srcset', generatedImgSrcset.srcsetRaster);
  imgAttributes.set('sizes', imgSrcsetSizes);

  return [
    '<picture>',
    `<source type='image/avif' srcset='${generatedImgSrcset.srcsetAvif}' sizes='${imgSrcsetSizes}'>`,
    `<source type='image/webp' srcset='${generatedImgSrcset.srcsetWebp}' sizes='${imgSrcsetSizes}'>`,
    `<img ${serializeAttributes(imgAttributes)}>`,
    '</picture>',
  ].join('');
};

const parseAttributes = (attributeString: string): iface.TParsedAttributes => {
  const attributes: iface.TParsedAttributes = new Map();

  let match: RegExpExecArray | null;
  htmlAttributeRegex.lastIndex = 0;

  while ((match = htmlAttributeRegex.exec(attributeString)) !== null) {
    attributes.set(match[1].toLowerCase(), match[3]);
  }

  return attributes;
};

const htmlAttributeRegex = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(["'])(.*?)\2/g;

const generateSrcsetForImage = async (srcPublicPath: string, resourceDirName: string): Promise<iface.IImgSrcset | undefined> => {
  const extension = path.extname(srcPublicPath).toLowerCase();

  // FIXME HEIC already been converted, yea?
  if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
    console.debug('unsupported extension, skipping', srcPublicPath);

    return;
  }

  const sourceFilePath = path.join(publicDirectory, srcPublicPath.replace(/^\//, '')); // /images becomes images .
  if (!fs.existsSync(sourceFilePath)) {
    console.warn('source image not found, skipping', sourceFilePath);

    return;
  }

  const normalizedExtension = (extension === '.jpeg' ? '.jpg' : extension) as '.jpg' | '.png';
  const base = path.basename(srcPublicPath, extension);

  // The subDirectory logic is dumb and prone to breaking.
  // Basically, because you copy posts from one file to another for scaffolding,
  //  you have a placeholder image that's from another post. Unexpected.
  // Also, sometimes images are themselves in subdirs...more expected.
  // The business logic below works for your current setup,
  //  but FIXME clean this up.
  let subDirectory: string | undefined;

  let outDirectory = path.join(publicDirectory, 'images', 'posts', resourceDirName, imgSrcsetsDirectoryName);

  const imagePath = path.dirname(sourceFilePath).replace(`${process.cwd()}/src/frontend/public`, '');
  console.debug('imagePath', imagePath);

  if (imagePath === `/images/posts/${resourceDirName}`) {
    // No subdir.
  } else if (!imagePath.includes(`/images/posts/${resourceDirName}`)) {
    // Image from another post is being used, which complicates matters (you do this for scaffolding).
    subDirectory = imagePath.replace('/images/posts/', '');
  } else {
    console.debug('imagePath.split', imagePath.split('/').length);
    if (imagePath.split('/').length > 3) { // Then we have a subdir.
      subDirectory = imagePath.replace(`/images/posts/${resourceDirName}/`, '');
    }
  }

  console.debug('subDirectory', subDirectory, 'outDirectory', outDirectory);
  if (subDirectory) {
    outDirectory = path.join(publicDirectory, 'images', 'posts', resourceDirName, imgSrcsetsDirectoryName, subDirectory);
  }

  fs.mkdirSync(outDirectory, { recursive: true });

  const originalImage = fs.readFileSync(sourceFilePath);

  const metadata = await sharp(originalImage).metadata();
  const sourceWidth = metadata.width ?? maxImageWidth;
  const finalWidth = Math.min(maxImageWidth, sourceWidth);

  const widths = imgSrcsetWidths.filter((width) => width < sourceWidth);
  if (!widths.includes(finalWidth)) { widths.push(finalWidth); }
  widths.sort((a, b) => a - b);

  const variants: iface.TImgSrcsetVariant[] = [];

  for (const width of widths) {
    const variant = await generateVariantForWidth({
      originalImage,
      width,
      base,
      normalizedExtension,
      outDirectory,
      resourceDirName,
      subDirectory
    });

    variants.push(variant);
  }

  return {
    srcsetRaster: variants.map((v) => `${v.jpg} ${v.width}w`).join(', '),
    srcsetWebp: variants.map((v) => `${v.webp} ${v.width}w`).join(', '),
    srcsetAvif: variants.map((v) => `${v.avif} ${v.width}w`).join(', '),
  };
};

const publicDirectory = path.join(process.cwd(), 'src/frontend/public');
const imgSrcsetsDirectoryName = 'srcsets';

const maxImageWidth = 1600;
const imgSrcsetWidths = [480, 800, 1200, 1600];

const generateVariantForWidth = async (args: {
  originalImage: Buffer;
  width: number;
  base: string;
  normalizedExtension: '.jpg' | '.png';
  outDirectory: string;
  resourceDirName: string;
  subDirectory?: string;
}): Promise<iface.TImgSrcsetVariant> => {
  const { originalImage, width, base, normalizedExtension, outDirectory, resourceDirName } = args;

  const suffix = `-${width}w`;
  const rasterPath = path.join(outDirectory, `${base}${suffix}${normalizedExtension}`);
  const webpPath = path.join(outDirectory, `${base}${suffix}.webp`);
  const avifPath = path.join(outDirectory, `${base}${suffix}.avif`);

  console.debug('generating', rasterPath);

  const rasterExists = fs.existsSync(rasterPath);
  const webpExists = fs.existsSync(webpPath);
  const avifExists = fs.existsSync(avifPath);

  // The raster variant is the source for the webp/avif images,
  //  so if it's missing you definitely probably maybe need to generate the webp/avif.
  // FIXME No nice way to check if an image has changed from last build w/o keeping a cache on disk of shas?
  // Don't want to pull release. If builds get too slow or manually deleting imgsrcsets sucks, come back to this.
  if (!rasterExists) {
    await saveImage(originalImage, width, rasterPath, normalizedExtension);
  } else {
    console.debug('skipping imgsrc raster for src', rasterPath);
  }

  const resized = fs.readFileSync(rasterPath);

  if (!webpExists || !rasterExists) {
    await sharp(resized).webp({ quality: 80 }).toFile(webpPath);
  } else {
    console.debug('skipping generating webp for src', webpPath);
  }

  if (!avifExists || !rasterExists) {
    await sharp(resized).avif({ quality: 60 }).toFile(avifPath); // AVIF needs a lower number for equivalent visual quality?
  } else {
    console.debug('skipping generating avif for src', avifPath);
  }

  const imageUriPrefix = args.subDirectory
    ? `/images/posts/${resourceDirName}/${imgSrcsetsDirectoryName}/${args.subDirectory}`
    : `/images/posts/${resourceDirName}/${imgSrcsetsDirectoryName}`;

  return {
    width,
    jpg: `${imageUriPrefix}/${base}${suffix}${normalizedExtension}`,
    webp: `${imageUriPrefix}/${base}${suffix}.webp`,
    avif: `${imageUriPrefix}/${base}${suffix}.avif`,
  };
};

const saveImage = async (source: Buffer, width: number | undefined, filePath: string, extension: '.jpg' | '.png') => {
  let pipeline = sharp(source).rotate(); // Auto-orient from EXIF before we strip it.

  if (width) { pipeline = pipeline.resize({ width }); }

  if (extension === '.jpg') {
    await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(filePath);
  } else {
    await pipeline.png({ quality: 80, compressionLevel: 9 }).toFile(filePath);
  }
};

const imgSrcsetSizes = '(max-width: 768px) 100vw, 800px';

const serializeAttributes = (attrs: iface.TParsedAttributes): string => {
  const parts: string[] = [];
  for (const [key, value] of attrs) {
    parts.push(`${key}='${value}'`);
  }

  return parts.join(' ');
};
