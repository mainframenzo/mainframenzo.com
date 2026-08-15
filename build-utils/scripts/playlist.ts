// This file is responsible for providing playlist utilities.
import * as fs from 'fs';
import * as csv from 'fast-csv';

import * as iface from './iface';

export const getPlaylistSongs = async (playlistFilePath: string): Promise<Array<iface.ISong>> => {
  const songs: iface.ISong[] = [];

  let rowNumber = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(playlistFilePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', row => {
        rowNumber = rowNumber + 1;

        const song = row as iface.ISong;
        song.rowNumber = rowNumber;

        songs.push(song);
      })
      .on('end', (_rowCount: number) => {
        console.debug('parsed songs', songs);

        resolve(songs);
      });
  });
}
