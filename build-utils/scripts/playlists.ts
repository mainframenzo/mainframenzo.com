// This file is responsible for handling playlist build logic for (blog) posts.
import _globalThis from '../../src/@types/global-this';

import * as fs from 'node:fs';
import * as path from 'node:path';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ejs = require('ejs');

import * as iface from './iface';
import { getPlaylistSongs } from './playlist';
import { ISongAnalysisSummary } from './iface';

export const generateHTML = async (playlist: iface.IPlaylistMarkdownReference): Promise<string> => {
  const templateString = fs.readFileSync(path.join(process.cwd(), `src/frontend/templates.partials/playlist.ejs`), 'utf-8');
  console.debug('playlist templateString', templateString, playlist);

  const playlistFilePath = path.join(process.cwd(), `src/frontend/playlists/${playlist.name}.csv`);
  console.debug('playlistFilePath', playlistFilePath);

  const songs = await (await getPlaylistSongs(playlistFilePath)).map(song => {
    song.filePath = `${_globalThis.media_directory}/${song['YouTube URL'].split('v=')[1]}.webm`;

    song.songId = getSongId(song['YouTube URL']);
    song.fileName = `${song.songId}.webm`;

    //song.filePath = song.filePath.replace('./src/frontend/public', '');
    //if (song.thumbnailPath) { song.thumbnailPath = song.thumbnailPath.replace('./src/frontend/public', ''); }

    return song;
  });
  const playlistId = playlist.name.concat('-playlist'); // Derive from file name.
  console.debug('playlist songs', playlistId, songs);

  const songAnalysesSummary = getSongAnalysesSummary(playlist.name);

  let templateData: Record<string, any> = {};
  templateData['playlistId'] = playlistId;
  templateData['songs'] = songs;

  templateData = { ...templateData, ...songAnalysesSummary };

  return ejs.render(templateString, templateData);
}

const getSongId = (youtubeUrl: string): string => {
  console.trace('getSongId', youtubeUrl);

  const watchMatch = youtubeUrl.match(/[?&]v=([^&]+)/);
  console.debug('watchMatch', watchMatch);

  // FIXME Need to figure out a better way to handle this.
  if (watchMatch == null) {
    return new Date().getTime().toString();
    //throw new Error('Incorrect YouTube URL format');
  }

  return watchMatch[1];
}

const getSongAnalysesSummary = (playlistName: string): Record<string, any> => {
  let songAnalysesSummaries: ISongAnalysisSummary[] = [];
  try {
    const fileContents = fs.readFileSync(`${process.cwd()}/src/frontend/public/playlist-analyzer/summary.${playlistName}.json`).toString();

    songAnalysesSummaries = JSON.parse(fileContents) as ISongAnalysisSummary[];
  } catch (error) {} // Eat.

  const headings = [
    'Track Name',
    'Artist',
    'Duration (s)',
    'BPM 1', // From all-in-one-infer.
    'BPM 2', // From essentia.
    'No. Segments',
    'Key',
    'Scale',
    'Key Strength',
    'Danceability',
    'Onset Rate',
    'Avg. Loudness',
    'Dynmamic Complexity',
    'Loudness EB128',
    'Spectral Centroid Mean',
    'Dissonance Mean',
    'Tuning Frequency',
    'Chords Key',
    'Chords Scale',
    'Chords Change Rate',
    'Chords No. Rate',
    'Count Break',
    'Count Bridge',
    'Count Chorus',
    'Count End',
    'Count Inst',
    'Count Intro',
    'Count Outro',
    'Count Solo',
    'Count Start',
    'Count Verse'
  ];

  const rows = songAnalysesSummaries.map(row => [
    row.track,
    row.artist,
    Math.round(row.duration_seconds),
    Math.round(row.bpm_all_in_one),
    Math.round(row.essentia_bpm || -1),
    row.num_segments,
    row.essentia_key,
    row.essentia_scale,
    row.essentia_key_strength,
    to2SigFigs(row.essentia_danceability),
    to2SigFigs(row.essentia_onset_rate),
    to2SigFigs(row.essentia_average_loudness),
    to2SigFigs(row.essentia_dynamic_complexity),
    to2SigFigs(row.essentia_loudness_ebu128_integrated),
    to2SigFigs(row.essentia_spectral_centroid_mean),
    to2SigFigs(row.essentia_dissonance_mean),
    to2SigFigs(row.essentia_tuning_frequency),
    row.essentia_chords_key,
    row.essentia_chords_scale,
    row.essentia_chords_changes_rate,
    row.essentia_chords_number_rate,
    row.count_break,
    row.count_bridge,
    row.count_chorus,
    row.count_end,
    row.count_inst,
    row.count_intro,
    row.count_outro,
    row.count_solo,
    row.count_start,
    row.count_verse
  ]);

  const songAnalysesSummary = { headings, data: rows };

  return {
    'songAnalysesSummary': songAnalysesSummary,
    'escapedSongAnalysesSummary': escapeForHtmlAttribute(JSON.stringify(songAnalysesSummary))
  };
}

const to2SigFigs = (value: number | null) => {
  if (value === null) { return -1; }

  return Math.round(value * 100) / 100;
}

// Strings can contain ', which closes HTML attribute early.
const escapeForHtmlAttribute = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
