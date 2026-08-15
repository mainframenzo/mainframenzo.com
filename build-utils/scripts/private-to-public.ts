#! node
// This file is responsible for preparing the private version of this source code for public viewing.
// Scrub private or "not ready" files.
// Files from the private repository are copied to a tmp folder with some exclusions:
//  rsync -av --progress $cwd/ ${tmp_dir}/mainframenzo.com/ --exclude .git --exclude node_modules --exclude dist.*
// This is done so you don't have to worry about Git, dependencies, or build files.
// The .gitignore file takes care of the rest.
import * as fs from 'fs/promises';
import { rm } from 'node:fs/promises';
import * as path from 'node:path';
import { globby } from 'globby';

import * as iface from './iface';
import * as posts from './posts';
import { dirsToScrub, filesToScrub } from './private-to-public.config';

// FIXME
// ts-npm, a tool you wrote, outputs a @comment with an absolute glob path of what files it generated package.json from.
// This @comment contains a username, which is my home directory, which contains name-like information.
// Until you fix ts-npm, update the package.json file to remove this information because one of the computers you use has a real name as your username.
const scrubPackageJson = async () => {
  console.trace('scrubPackageJson');

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonContents = await fs.readFile(packageJsonPath);
  console.debug('packageJsonContents.toString()', packageJsonContents.toString());
  const packageJson = JSON.parse(packageJsonContents.toString());

  // @ts-ignore
  packageJson['@comment'] = 'This file was generated from .npm/npm*.ts .';

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Remove sensitive data from the config files by overwriting them with an unconfigured copy.
const scrubConfigDotEnv = async () => {
  console.trace('scrubConfigDotEnv');

  const dotEnvBackupPath = path.join(process.cwd(), './config/.env.backup');
  const dotEnvPath = path.join(process.cwd(), './config/.env');
  await fs.copyFile(dotEnvBackupPath, dotEnvPath);

  // You still keep your legacy config around. It contains AWS infra deployment information.
  // You've since moved on from AWS, but it's there JIC.
  const dotEnvLegacyBackupPath = path.join(process.cwd(), './config/.env.legacy.backup');
  const dotEnvLegacyPath = path.join(process.cwd(), './config/.env.legacy');
  await fs.copyFile(dotEnvLegacyBackupPath, dotEnvLegacyPath);
}

// Remove unpublished posts and related files.
const scrubDrafts = async (allPosts: iface.IPost[]) => {
  console.trace('scrubDrafts');

  for (const post of allPosts) {
    console.debug(`removing draft post data: ${post.postInfo.title} ${post.postInfo.resourceDirName || ''}`);

    await tryRemoveDraftData(post);
  }
}

const tryRemoveDraftData = async (post: iface.IPost) => {
  console.trace('tryRemoveDraftData', post.postInfo.title);

  // FIXME Add "fileName" if title was supplied via JSON rather than inferred from file.
  try {
    const postPath = path.join(process.cwd(), `./src/frontend/posts/${post.postInfo.title}.md`);
    console.debug('postPath', postPath);
    await fs.rm(postPath, { force: true });
  } catch (error) {
    console.error('failed to remove post markdown', error);

    process.exit(1);
  }

  if (!post.postInfo.resourceDirName) {
    console.warn('can not remove resource dir for post, not found', post.postInfo.title);

    return;
  }

  // Use globs so draft posts don't need to specify the 3d slideshow/bom/build slideshows...they're drafts.
  await scrubFilesWithGlob(path.join(process.cwd(), `./src/frontend/3d-slideshows/posts/${post.postInfo.resourceDirName}*`));
  await scrubFilesWithGlob(path.join(process.cwd(), `./src/frontend/boms/posts/${post.postInfo.resourceDirName}*`));
  await scrubFilesWithGlob(path.join(process.cwd(), `./src/frontend/build-slideshows/posts/${post.postInfo.resourceDirName}*`));

  try {
    const audioDir = path.join(process.cwd(), `./src/frontend/public/audio/posts/${post.postInfo.resourceDirName}`);
    console.debug('audioDir', audioDir);
    await fs.rmdir(audioDir, { recursive: true });
  } catch (error) {
    console.warn('did not remove post audio, may not have any', post.postInfo.title);
  }

  try {
    const downloadsDir = path.join(process.cwd(), `./src/frontend/public/downloads/posts/${post.postInfo.resourceDirName}`);
    console.debug('downloadsDir', downloadsDir);
    await fs.rmdir(downloadsDir, { recursive: true });
  } catch (error) {
    console.warn('did not remove post downloads, may not have any', post.postInfo.title);
  }

  try {
    const generatedDir = path.join(process.cwd(), `./src/frontend/public/generated/${post.postInfo.resourceDirName}`);
    console.debug('generatedDir', generatedDir);
    await fs.rmdir(generatedDir, { recursive: true });
  } catch (error) {
    console.warn('did not remove post generated, may not have any', post.postInfo.title);
  }

  try {
    const imagesDir = path.join(process.cwd(), `./src/frontend/public/images/posts/${post.postInfo.resourceDirName}`);
    console.debug('imagesDir', imagesDir);
    await fs.rmdir(imagesDir, { recursive: true });
  } catch (error) {
    console.warn('did not remove post images, may not have any', post.postInfo.title);
  }

  try {
    const oneOffsDir = path.join(process.cwd(), `./src/frontend/one-offs/posts/${post.postInfo.resourceDirName}`);
    console.debug('oneOffsDir', oneOffsDir);
    await fs.rmdir(oneOffsDir, { recursive: true });
  } catch (error) {
    console.warn('did not remove post one-offs, may not have any', post.postInfo.title);
  }

  try {
    const partsLibrariesDir = path.join(process.cwd(), `./src/frontend/public/parts-libraries/posts/${post.postInfo.resourceDirName}`);
    console.debug('partsLibrariesDir', partsLibrariesDir);
    await fs.rmdir(partsLibrariesDir, { recursive: true });
  } catch (error) {
    console.warn('did not remove post parts libraries, may not have any', post.postInfo.title);
  }

  // FIXME Figure out playlist convention.
  // try {
  //   const playlistsDir = path.join(process.cwd(), `./src/frontend/playlists/posts/${post.postInfo.resourceDirName}`);
  //   console.debug('playlistsDir', playlistsDir);
  //   await fs.rmdir(playlistsDir, { recursive: true });
  // } catch (error) {
  //   console.warn('did not remove post playlists, may not have any', post.postInfo.title);
  // }

  /* Not needed ATM - source code was pulled out to Github.
  try {
    const softwareDir = path.join(process.cwd(), `./src/frontend/public/software/posts/${post.postInfo.resourceDirName}`);
    console.debug('softwareDir', softwareDir, { recursive: true });
    await fs.rmdir(softwareDir, { recursive: true });
  } catch (error) {
    console.warn('did not remove post software, may not have any', post.postInfo.title);
  }
  */

  try {
    const videoDir = path.join(process.cwd(), `./src/frontend/public/video/posts/${post.postInfo.resourceDirName}`);
    console.debug('videoDir', videoDir);
    await fs.rmdir(videoDir, { recursive: true });
  } catch (error) {
    console.warn('did not remove post video, may not have any', post.postInfo.title);
  }
}

const scrubFilesWithGlob = async (globDir: string) => {
  console.debug('scrubFilesWithGlob', globDir);

  const filePaths = await globby([globDir]);
  console.debug('filePaths', filePaths);

  for (const filePath of filePaths) {
    await tryRemoveFile(filePath);
  }
}

const tryRemoveFile = async (filePath: string) => {
  console.trace('tryRemoveFile', filePath);

  try {
    await fs.rm(filePath, { force: true });
  } catch (error) {
    console.warn('failed to remove file', error);
  }
}

const scrubDirs = async (dirPaths: string[]) => {
  console.trace('scrubDirs');

  for (const dirPath of dirPaths) {
    console.debug(`removing dir: ${dirPath}`);

    await tryRemoveDir(dirPath);
  }
}

const tryRemoveDir = async (dirPath: string) => {
  console.trace('tryRemoveDir', dirPath);

  try {
    await rm(dirPath, { recursive: true, force: true });
  } catch (error) {
    console.error('failed to remove dir', error);

    process.exit(1);
  }
}

const scrubFiles = async (filePaths: string[]) => {
  console.trace('scrubFiles');

  for (const filePath of filePaths) {
    console.debug(`removing file: ${filePath}`);

    await tryRemoveFile(filePath);
  }
}

const verifyScrubbedDrafts = async (allPosts: iface.IPost[]) => {
  console.trace('verifyScrubbedDrafts');

  for (const post of allPosts) {
    // FIXME all possible dirs
    try {
      const postHtmlPath = path.join(process.cwd(), `./dist.frontend/posts/${post.postInfo.title}.html`);
      console.debug(`checking scrubbed ${postHtmlPath}`);
      await fs.access(postHtmlPath);

      console.error(`scrub verification failed - draft post still exists: ${postHtmlPath}`);

      process.exit(1);
    } catch {} // Eat. Absent.
  }
}

const verifyScrubbedDirs = async (dirPaths: string[]) => {
  console.trace('verifyScrubbedDirs');

  for (const dirPath of dirPaths) {
    try {
      console.debug(`checking scrubbed ${dirPath}`);
      await fs.access(dirPath);

      console.error(`scrub verification failed, dir still exists: ${dirPath}`);

      process.exit(1);
    } catch {} // Eat. Absent.
  }
}

const verifyScrubbedFiles = async (filePaths: string[]) => {
  console.trace('verifyScrubbedFiles');

  for (const filePath of filePaths) {
    try {
      console.debug(`checking scrubbed ${filePath}`);
      await fs.access(filePath);

      console.error(`scrub verification failed, file still exists: ${filePath}`);

      process.exit(1);
    } catch {} // Eat. Absent.
  }
}

const thingsivemade = await posts.getAllDrafts('#thingsivemade');
const musings = await posts.getAllDrafts('#musing');
const software = await posts.getAllDrafts('#software');
const drawings = await posts.getAllDrafts('#drawing');
const vehicles = await posts.getAllDrafts('#vehicle');
const playlists = await posts.getAllDrafts('#playlist');

const allPosts = [
  ...thingsivemade,
  ...musings,
  ...software,
  ...drawings,
  ...vehicles,
  ...playlists
];

await scrubPackageJson();
await scrubConfigDotEnv();
await scrubDrafts(allPosts);
await scrubDirs(dirsToScrub);
await scrubFiles(filesToScrub);

const packageJson = JSON.parse((await fs.readFile(path.join(process.cwd(), 'package.json'))).toString());
if (packageJson['@comment']?.includes('/home/') || packageJson['@comment']?.includes('/Users/')) {
  console.error('scrub verification failed - package.json @comment still contains path with username');

  process.exit(1);
}
await verifyScrubbedDrafts(allPosts);
await verifyScrubbedDirs(dirsToScrub);
await verifyScrubbedFiles(filesToScrub);
