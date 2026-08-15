#! node
// This file is responsible for downloading playlist media, which amounts to:
// * the song (if it's not stored where you store our media on our personal computer)
// * the album art (if it's not stored where you store our media on our personal computer)
// You paid for a bunch of these songs already, but they're in "personal" media and not "website" media,
//  and you try not to conflate the two.
// You use YouTube as your primary "download" source - no reason to stream from them every time.
// Folks viewing a playlist see YouTube links (FIXME embed links?), but you can enter a password
//  and stream directly from your website.
// Hopefully password-protecting the media files is good enough to not get sued.
import _globalThis from '../../src/@types/global-this';

import * as fs from 'fs';
import spawn from 'spawn-please';

import { argparser } from './download-playlist-media.argparser';
import { getPlaylistSongs } from './playlist';

const dryRun = JSON.parse(argparser.args['dry-run']);
console.debug('dryRun', dryRun);

const downloadAudioFromYoutube = async (url: string) => {
  const videoId = url.replace('https://www.youtube.com/watch?v=', '');
  const outputFile = `${_globalThis.media_directory}/${videoId}.webm`;
  if (fs.existsSync(outputFile)) { return; }

  console.trace('downloadAudioFromYoutube', url, outputFile);

  if (dryRun) { return; }

  let youtubeDownloaderResponse = '';
  await spawn(`${process.cwd()}/build-utils/bin/yt-dlp_linux`, [videoId, '-f', 'bestaudio', '--js-runtimes', 'node', '-o', `${_globalThis.media_directory}/${videoId}.webm`], {
    rejectOnError: true,
    stdout: (data) => { youtubeDownloaderResponse += Buffer.from(data).toString(); },
    stderr: (data) => { console.error(Buffer.from(data).toString()); }
  }, { cwd: `${process.cwd()}/build-utils/bin` });
  console.debug('youtubeDownloaderResponse', youtubeDownloaderResponse);

  await sleep(1000); // Sleep here so dry-run/skipping existing files is speedy.
}

const sleep = async (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const downloadAlbumArt = async (artistsName: string, albumNames: string) => {
  // You pulled these from: https://github.com/lacymorrow/album-art
  // Pretty sure you have to signup for these.
  // Do they even work?
  const API_ENDPOINT = 'https://api.spotify.com/v1';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/api/token';
  const CLIENT_ID = '3f974573800a4ff5b325de9795b8e603';
  const CLIENT_SECRET = 'ff188d2860ff44baa57acc79c121a3b9';

  const getAuthToken = async (): Promise<string> => {
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const res = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authString}`,
      },
    });

    const json = await res.json();
    return json.access_token;
  }

  const getAlbumArtURL = async (): Promise<string> => {
    const method = 'album';
    const query = [artistsName, albumNames].filter(Boolean).join(' ').replace('&', 'and');
    const queryParams = `?q=${encodeURIComponent(query)}&type=${method}&limit=1`;
    const searchUrl = `${API_ENDPOINT}/search${queryParams}`;

    const authToken = await getAuthToken();

    const res = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      }
    });

    const json = await res.json();
    if (json.error) {
      throw new Error(`Error fetching album art - ${json.error} ${json.message}`);
    }

    const results = json[`${method}s`];
    if (!results || results.items.length === 0) {
      throw new Error('Error fetching album art - no results');
    }

    const images: { url: string; width: number }[] = results.items[0].images;
    const sorted = [...images].sort((a, b) => a.width - b.width);

    return sorted[0].url;
  }

  const albumArtUrl = await getAlbumArtURL();
  console.debug('albumArtUrl', albumArtUrl);

  // FIXME save URL to disk
}

const playlistSongs = await getPlaylistSongs(argparser.args['playlist-file-path']);
console.debug('playlistSongs', playlistSongs);

for (const song of playlistSongs) {
  // FIXME determine media path from artist-albuum-song .webm lowercase

  await downloadAudioFromYoutube(song['YouTube URL']);

  // FIXME get album art only if you can get the song.
}
