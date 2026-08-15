// This file is responsible for handling Media API requests.
import _globalThis from '../@types/global-this';

import type { Context } from 'openapi-backend';
import type { Request, Response } from 'express';
import { components } from '../openapi-def/types';
import { readFile } from 'fs/promises';
import path from 'path';

export const downloadPlaylistSong = async (context: Context<{}>, req: Request, res: Response) => {
  console.trace('downloadPlaylistSong');

  const { _playlistId, songId } = req.params; // FIXME Why is type string | string[]?

  if (!songId || !validSongIdRegex.test(songId as string)) {
    return res.status(400).json({ status: 'error', message: 'Invalid song ID.' } as components['schemas']['IJSendResponse']);
  }

  let mediaDirectory;
  if (_globalThis.app_location === 'local') {
    mediaDirectory = process.env.local_media_directory;
  } else {
    mediaDirectory = process.env[`${_globalThis.app_stage}_media_directory`];
  }

  if (!mediaDirectory) {
    return res.status(500).json({ status: 'error', message: 'Internal server error.' } as components['schemas']['IJSendResponse']);
  }

  const resolvedMediaDirectory = path.resolve(mediaDirectory);
  const mediaFilePath = path.resolve(resolvedMediaDirectory, `${songId}.webm`);

  if (!mediaFilePath.startsWith(resolvedMediaDirectory + path.sep)) {
    return res.status(400).json({ status: 'error', message: 'Invalid song ID. Stop fucking around.', data: {} } as components['schemas']['IJSendResponse']);
  }

  const base64FileContents = await readFile(mediaFilePath, 'base64');

  res.status(200).json({ status: 'ok', message: 'Downloaded file.', data: base64FileContents } as components['schemas']['IJSendResponse']);
}

// Do not allow characters which could be used to escape the media directory.
const validSongIdRegex = /^[a-zA-Z0-9_-]+$/;

