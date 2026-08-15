#! node
// This file is responsible for converting a playlist exported from Spotify
//  into your playlist CSV format.
import * as fs from 'fs';
import * as csv from 'fast-csv';

import { argparser } from './convert-spotify-playlist.argparser';
import * as iface from './iface';

const dryRun = JSON.parse(argparser.args['dry-run']);
console.debug('dryRun', dryRun);

const spotifyHeaders = {
  URI: 'Track URI',
  TRACK_NAME: 'Track Name',
  ALBUM_NAME: 'Album Name',
  ARTIST_NAMES: 'Artist Name(s)',
} as const;

const playlistHeaders = ['Track Name', 'Artist Name(s)', 'Album Name', 'YouTube URL', 'Artist Wikipedia URL', 'Alternate URL'];

const main = async () => {
  const spotifyRows = await readSpotifyPlaylist(argparser.args['playlist-file-path']);
  console.debug('spotifyRows', spotifyRows.length);

  const ourRows = spotifyRows.map(convertSpotifyRowToOurFormat);

  await writeOurPlaylist(argparser.args['playlist-output-file-path'], ourRows);

  if (dryRun) {
    console.debug('dry run complete');
  }
}

const readSpotifyPlaylist = async (spotifyFilePath: string): Promise<iface.IRow[]> => {
  console.debug('readSpotifyPlaylist', spotifyFilePath);

  const rows: iface.IRow[] = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(spotifyFilePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row: iface.IRow) => {
        rows.push(row);
      })
      .on('end', resolve)
      .on('error', reject);
  });

  return rows;
};

const convertSpotifyRowToOurFormat = (spotifyRow: iface.IRow): iface.IRow => {
  const trackName = spotifyRow[spotifyHeaders.TRACK_NAME];
  const artistNames = spotifyRow[spotifyHeaders.ARTIST_NAMES];
  const albumName = spotifyRow[spotifyHeaders.ALBUM_NAME];
  console.debug('convertSpotifyRowToOurFormat', trackName, artistNames, albumName);
  return {
    'Track Name': trackName,
    'Artist Name(s)': artistNames,
    'Album Name': albumName,
    'YouTube URL': '',
    'Artist Wikipedia URL': '',
    'Alternate URL': '',
  };
};

const writeOurPlaylist = async (outputFilePath: string, rows: iface.IRow[]) => {
  console.debug('writeOurPlaylist', outputFilePath, rows.length);
  if (dryRun) {
    console.debug('dry run complete', JSON.stringify(rows, null, 2));

    return;
  }

  await new Promise((resolve, reject) => {
    csv.writeToPath(outputFilePath, rows, { headers: playlistHeaders })
      .on('finish', () => resolve(void 0))
      .on('error', reject);
  });
};

await main();
