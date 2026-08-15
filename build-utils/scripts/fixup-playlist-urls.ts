#! node
// This file is responsible for checking that playlist URLs (YouTube, Wikipedia, Deezer)
//  are valid and fixing the ones that are not.
import * as fs from 'fs';
import * as csv from 'fast-csv';
import * as youtubeLinkUtils from '@genway-ai/youtube-link-utils';
import youtubesearchapi from 'youtube-search-api';
import * as iface from './iface';
import { argparser } from './fixup-playlist-urls.argparser';
import { getPlaylistSongs } from './playlist';

const dryRun = JSON.parse(argparser.args['dry-run']);
console.debug('dryRun', dryRun);

const main = async () => {
  const playlistSongs = await getPlaylistSongs(argparser.args['playlist-file-path']);
  console.debug('playlistSongs', playlistSongs);

  for (const song of playlistSongs) {
    const validYoutubeURL = await validateYoutubeURL(song['YouTube URL']);

    if (!validYoutubeURL) {
      try {
        const youtubeUrl = await tryGetYoutubeURL(song['Track Name'], song['Artist Name(s)'], song['Album Name']);
        console.debug(`found youtube url for song ${song['Track Name']}: ${youtubeUrl}`);

        try {
          await updateColumnInPlaylistFile(song, 'YouTube URL', youtubeUrl);
        } catch (error) {
          console.error('failed to save update to disk', (error as Error).message);
        }
      } catch (error) {
        console.error('failed to find a youtube url for song', (error as Error).message);
      }

      await sleep(1000);
    }

    const validWikipediaURL = song['Artist Wikipedia URL'] ? await validateWikipediaURL(song['Artist Wikipedia URL']) : false;
    if (!validWikipediaURL) {
      try {
        const wikipediaUrl = await tryGetWikipediaURL(song['Artist Name(s)']);
        console.debug(`found wikipedia url for artist ${song['Artist Name(s)']}: ${wikipediaUrl}`);

        try {
          await updateColumnInPlaylistFile(song, 'Artist Wikipedia URL', wikipediaUrl);
        } catch (error) {
          console.error('failed to save update to disk', (error as Error).message);
        }
      } catch (error) {
        console.error('failed to find a wikipedia url for artist', (error as Error).message);
      }

      await sleep(1000);
    }

    const validDeezerURL = song['Alternate URL'] ? await validateDeezerURL(song['Alternate URL']) : false;
    if (!validDeezerURL) {
      try {
        const deezerUrl = await tryGetDeezerURL(song['Track Name'], song['Artist Name(s)']);
        console.debug(`found deezer url for song ${song['Track Name']}: ${deezerUrl}`);

        try {
          await updateColumnInPlaylistFile(song, 'Alternate URL', deezerUrl);
        } catch (error) {
          console.error('failed to save update to disk', (error as Error).message);
        }
      } catch (error) {
        console.error('failed to find a deezer url for song', (error as Error).message);
      }

      await sleep(1000);
    }
  }

  if (dryRun) {
    console.debug('dry run complete');
  }
}

const validateYoutubeURL = async (url: string): Promise<boolean> => {
  console.trace('validateYouTubeURL', url);
  const videoInfo = await youtubeLinkUtils.getYouTubeVideoInfo(url);
  return videoInfo?.title !== undefined ? true : false; // FIXME fuzzy match with expected title.
};

const tryGetYoutubeURL = async (trackName: string, artistsName: string, albumNames?: string) => {
  console.debug('tryGetYoutubeURL', trackName, artistsName);
  const searchResults = await youtubesearchapi.GetListByKeyword(`${trackName} ${artistsName}${albumNames ? ' ' + albumNames : ''}`, false, 5);
  console.debug('searchResults', JSON.stringify(searchResults, null, 2));
  return `https://www.youtube.com/watch?v=${searchResults.items[0].id}`;
};

const sleep = async (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const validateWikipediaURL = async (url: string): Promise<boolean> => {
  console.trace('validateWikipediaURL', url);
  const title = getWikipediaTitleFromURL(url);

  if (!title) { return false; }

  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    if (!response.ok) { return false; }

    const summary = await response.json();
    return summary?.title !== undefined && summary?.type !== 'disambiguation';
  } catch (error) {
    console.error('failed to validate wikipedia url', (error as Error).message);
    return false;
  }
};

// Pulls the page title out of a URL like https://en.wikipedia.org/wiki/Weezer
const getWikipediaTitleFromURL = (url: string): string | undefined => {
  const match = url.match(/\/wiki\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
};

const tryGetWikipediaURL = async (artistsName: string): Promise<string> => {
  console.debug('tryGetWikipediaURL', artistsName);

  const searchURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(artistsName)}&format=json&origin=*`;

  const response = await fetch(searchURL);
  if (!response.ok) {
    throw new Error(`wikipedia search failed with status ${response.status}`);
  }

  const searchResults = await response.json();
  console.debug('searchResults', JSON.stringify(searchResults, null, 2));

  const firstResult = searchResults?.query?.search?.[0];
  if (!firstResult?.title) {
    throw new Error(`no wikipedia results found for ${artistsName}`);
  }

  const pageTitle = firstResult.title.replace(/ /g, '_');
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
};

const validateDeezerURL = async (url: string): Promise<boolean> => {
  console.trace('validateDeezerURL', url);
  const trackId = getDeezerTrackIdFromURL(url);
  if (!trackId) { return false; }

  try {
    const response = await fetch(`https://api.deezer.com/track/${trackId}`);
    if (!response.ok) { return false; }

    const track = await response.json();

    return track?.id !== undefined && track?.error === undefined;
  } catch (error) {
    console.error('failed to validate deezer url', (error as Error).message);
    return false;
  }
};

// Pulls the track id out of a URL like https://www.deezer.com/track/2698953
const getDeezerTrackIdFromURL = (url: string): string | undefined => {
  const match = url.match(/\/track\/(\d+)/);

  return match ? match[1] : undefined;
};

const tryGetDeezerURL = async (trackName: string, artistsName: string): Promise<string> => {
  console.debug('tryGetDeezerURL', trackName, artistsName);

  const query = `track:"${trackName}" artist:"${artistsName}"`;

  const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`deezer search failed with status ${response.status}`);
  }

  const searchResults = await response.json();
  console.debug('searchResults', JSON.stringify(searchResults, null, 2));

  const firstResult = searchResults?.data?.[0];
  if (!firstResult?.link) {
    throw new Error(`no deezer results found for ${trackName} by ${artistsName}`);
  }

  return firstResult.link;
};

const updateColumnInPlaylistFile = async (song: iface.ISong, columnName: string, value: string) => {
  console.debug('updateColumnInPlaylistFile', song['Track Name'], song['Artist Name(s)'], columnName, value);

  let rowNumber = 0;
  const rows: iface.IRow[] = [];
  let headers: string[] = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(argparser.args['playlist-file-path'])
      .pipe(csv.parse({ headers: true }))
      .on('headers', (_header: string[]) => { headers = headers; })
      .on('data', (row: iface.IRow) => {
        rowNumber = rowNumber + 1;
        if (rowNumber == song.rowNumber) {
          row[columnName] = value;
        }
        rows.push(row);
      })
      .on('end', resolve)
      .on('error', reject);
  });

  if (dryRun) { return; }

  await new Promise((resolve, reject) => {
    csv.writeToPath(argparser.args['playlist-file-path'], rows, { headers: true })
      .on('finish', () => resolve(void 0))
      .on('error', reject);
  });
};

await main();
