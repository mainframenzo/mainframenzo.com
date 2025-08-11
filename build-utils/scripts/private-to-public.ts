#! node
// This file is responsible for preparing the private version of this source code for public viewing.
import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import * as fs from 'fs/promises';
import * as path from 'node:path';
import { globby } from 'globby';

import { argparser } from './private-to-public.argparser';

import * as iface from './iface';
import * as posts from './posts';

// FIXME
// ts-npm, a tool you wrote, outputs a @comment with an absolute glob path of what files it generated package.json from.
// This @comment contains a username, which is my home directory, which contains name-like information.
// Until you fix ts-npm, update the package.json file to remove this information on one of the computers you use.
const scrubPackageJson = async () => {
  log.trace('scrubPackageJson');

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonContents = await fs.readFile(packageJsonPath);
  log.debug('packageJsonContents.toString()', packageJsonContents.toString());
  const packageJson = JSON.parse(packageJsonContents.toString());

  // @ts-ignore
  packageJson['@comment'] = 'This file was generated from .npm/npm*.ts .';

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Remove sensitive data from the ./config/.env file by overwriting it with an unconfigured copy.
const scrubConfigDotEnv = async () => {
  log.trace('scrubConfigDotEnv');

  const dotEnvBackupPath = path.join(process.cwd(), './config/.env.backup');
  const dotEnvPath = path.join(process.cwd(), './config/.env');
  await fs.copyFile(dotEnvBackupPath, dotEnvPath);
}

// Remove unpublished posts and related files.
const scrubDrafts = async () => {
  log.trace('scrubDrafts');

  const thingsivemade = await posts.getAllDrafts('#thingsivemade');
  const musings = await posts.getAllDrafts('#musing');
  const software = await posts.getAllDrafts('#software');
  const drawings = await posts.getAllDrafts('#drawings');
  const vehicles = await posts.getAllDrafts('#vehicles');
  const recordings = await posts.getAllDrafts('#recordings');

  const allPosts = [
    ...thingsivemade,
    ...musings, 
    ...software,
    ...drawings, 
    ...vehicles,
    ...recordings
  ];

  for (const post of allPosts) {
    log.debug(`removing draft post data: ${post.postInfo.title} ${post.postInfo.resourceDirName || ''}`);

    await tryRemoveDraftData(post);
  }
}

const tryRemoveDraftData = async (post: iface.IPost) => {
  log.trace('tryRemoveDraftData', post.postInfo.title);

  // FIXME Add "fileName" if title was supplied via JSON rather than inferred from file.
  try {
    const postPath = path.join(process.cwd(), `./src/frontend/posts/${post.postInfo.title}.md`);
    log.debug('postPath', postPath);
    await fs.rm(postPath, { force: true });
  } catch (error) {
    log.error('failed to remove post markdown', error);

    process.exit(1);
  }

  if (!post.postInfo.resourceDirName) { 
    log.warn('can not remove resource dir for post, not found', post.postInfo.title);

    return; 
  }

  // Use globs so draft posts don't need to specify the 3d slideshow/bom/build slideshows...they're drafts.
  await scrubFilesWithGlob(path.join(process.cwd(), `./src/frontend/3d-slideshows/posts/${post.postInfo.resourceDirName}*`));
  await scrubFilesWithGlob(path.join(process.cwd(), `./src/frontend/boms/posts/${post.postInfo.resourceDirName}*`));
  await scrubFilesWithGlob(path.join(process.cwd(), `./src/frontend/build-slideshows/posts/${post.postInfo.resourceDirName}*`));

  try {
    const audioDir = path.join(process.cwd(), `./src/frontend/public/audio/posts/${post.postInfo.resourceDirName}`);
    log.debug('audioDir', audioDir);
    await fs.rmdir(audioDir, { recursive: true });
  } catch (error) {
    log.warn('did not remove post audio, may not have any', post.postInfo.title);
  }

  try {
    const downloadsDir = path.join(process.cwd(), `./src/frontend/public/downloads/posts/${post.postInfo.resourceDirName}`);
    log.debug('downloadsDir', downloadsDir);
    await fs.rmdir(downloadsDir, { recursive: true });
  } catch (error) {
    log.warn('did not remove post downloads, may not have any', post.postInfo.title);
  }

  try {
    const generatedDir = path.join(process.cwd(), `./src/frontend/public/generated/${post.postInfo.resourceDirName}`);
    log.debug('generatedDir', generatedDir);
    await fs.rmdir(generatedDir, { recursive: true });
  } catch (error) {
    log.warn('did not remove post generated, may not have any', post.postInfo.title);
  }

  try {
    const imagesDir = path.join(process.cwd(), `./src/frontend/public/images/posts/${post.postInfo.resourceDirName}`);
    log.debug('imagesDir', imagesDir);
    await fs.rmdir(imagesDir, { recursive: true });
  } catch (error) {
    log.warn('did not remove post images, may not have any', post.postInfo.title);
  }

  try {
    const partsLibrariesDir = path.join(process.cwd(), `./src/frontend/public/parts-libraries/posts/${post.postInfo.resourceDirName}`);
    log.debug('partsLibrariesDir', partsLibrariesDir);
    await fs.rmdir(partsLibrariesDir, { recursive: true });
  } catch (error) {
    log.warn('did not remove post parts libraries, may not have any', post.postInfo.title);
  }

  /* Not needed ATM - source code was pulled out to Github.
  try {
    const softwareDir = path.join(process.cwd(), `./src/frontend/public/software/posts/${post.postInfo.resourceDirName}`);
    log.debug('softwareDir', softwareDir, { recursive: true });
    await fs.rmdir(softwareDir, { recursive: true });
  } catch (error) {
    log.warn('did not remove post software, may not have any', post.postInfo.title);
  }
  */

  try {
    const videoDir = path.join(process.cwd(), `./src/frontend/public/video/posts/${post.postInfo.resourceDirName}`);
    log.debug('videoDir', videoDir);
    await fs.rmdir(videoDir, { recursive: true });
  } catch (error) {
    log.warn('did not remove post video, may not have any', post.postInfo.title);
  }
}

const scrubFilesWithGlob = async (globDir: string) => {
  log.debug('scrubFilesWithGlob', globDir);
  
  const filePaths = await globby([globDir]);
  log.debug('filePaths', filePaths);

  for (const filePath of filePaths) {
    await tryRemoveFile(filePath);
  }
}

const tryRemoveFile = async (filePath: string) => {
  log.trace('tryRemoveFile', filePath);

  try {
    await fs.rm(filePath);
  } catch (error) {
    log.error('failed to remove file', error);

    process.exit(1);
  }
}

const scrubDirs = async (dirPaths: string[]) => {
  log.trace('scrubDirs');

  for (const dirPath of dirPaths) {
    log.debug(`removing dir: ${dirPath}`);

    await tryRemoveDir(dirPath);
  }
}

const tryRemoveDir = async (dirPath: string) => {
  log.trace('tryRemoveDir', dirPath);

  try {
    await fs.rmdir(dirPath, { recursive: true });
  } catch (error) {
    log.error('failed to remove dir', error);

    process.exit(1);
  }
}

const scrubFiles = async (filePaths: string[]) => {
  log.trace('scrubFiles');

  for (const filePath of filePaths) {
    log.debug(`removing file: ${filePath}`);

    await tryRemoveFile(filePath);
  }
}
if (argparser.args['app-location'] === 'aws' && argparser.args['publish-stage'] === 'prod') {
  log.warn('will not scrub package.json and ./config/.env, needed for deploy, but will remove ./config/.env after');
} else {
  await scrubPackageJson();
  await scrubConfigDotEnv();
}
await scrubDrafts();
await scrubDirs([
  'src/frontend/public/images/drawings',
  'src/frontend/public/images/vehicles'
]);
await scrubFiles([
  'config/.env.backup',
  'src/frontend/templates.pages/resume.ejs',
  'src/frontend/templates.pages/resume-private.ejs',
  'src/frontend/public/downloads/resume-private.pdf',
  'src/frontend/public/downloads/resume-private.png',
  'src/parts-library-tools/playground-2d-physics.py',
  'src/parts-library-tools/playground-analyze-something-of-stl-with-freecad-elmer.py',
  'src/parts-library-tools/playground-assembly-parts-to-cad-drawings.py',
  'src/parts-library-tools/playground-assembly-to-cad-drawings.py',
  'src/parts-library-tools/playground-circuit-to-svg.py',
  'src/parts-library-tools/playground-fem-gen.py',
  'src/parts-library-tools/playground-generate-code-from-scan.py',
  'src/parts-library-tools/playground-simulation.py',
  'src/parts-library-tools/playground-topology-optimization-with-beso.py',
  'src/parts-library-tools/playground-render-assembly-as-gif-with-bd-animation.py',
  'knockdown.md',
  'issues.md',
  'meblog.conda.freecad.yaml',
  'readme.private.md'
]);