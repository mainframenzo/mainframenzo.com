// This file is responsible for upgrading playlists if JavaScript is enabled.
import * as api from './api';
import { ISong } from '../../../build-utils/scripts/iface';

//import './song-analysis';

export const tryUpgradePlaylists = async () => {
  const playlistElement = document.querySelector('.playlist');
  if (!playlistElement) { return; }

  const playlist = new Playlist(playlistElement);
  await playlist.init();
};

// maybe most applicable first?

// FIXME Generate table initially?
// const tryUpgradeSongAnalysesSummaryTable = async () => {
//   // Column metadata: hover description + numeric range used for the color gradient.
//   // "categorical: true" columns get a tooltip but no background color.
//   const COLUMN_META = {
//     "Duration (s)":          { desc: "Length of the track in seconds.", min: 60, max: 600 },
//     "BPM 1":                 { desc: "Tempo estimate (BPM) from the all-in-one structure model's beat tracker.", min: 60, max: 200 },
//     "BPM 2":                 { desc: "Tempo estimate (BPM) from Essentia's independent rhythm extractor.", min: 60, max: 200 },
//     "No. Segments":          { desc: "Number of structural segments detected (intro, verse, chorus, bridge, outro, etc).", min: 5, max: 20 },
//     "Key":                   { desc: "Estimated musical key (e.g. C, F#).", categorical: true },
//     "Scale":                 { desc: "Mode of the key: major or minor.", categorical: true },
//     "Key Strength":          { desc: "Confidence of the key estimate. Higher means a clearer, more unambiguous tonal center.", min: 0, max: 1 },
//     "Danceability":          { desc: "DFA-based danceability estimate. Higher values mean the track is more danceable.", min: 0, max: 3 },
//     "Onset Rate":            { desc: "Average number of note/percussive onsets per second, a proxy for rhythmic density.", min: 0, max: 8 },
//     "Avg. Loudness":         { desc: "Normalized overall loudness level of the track.", min: 0, max: 1 },
//     "Dynamic Complexity":    { desc: "Average deviation from the track's global loudness level, in dB. Higher means more contrast between quiet and loud parts.", min: 0, max: 10 },
//     "Loudness (LUFS)":       { desc: "Integrated program loudness per the EBU R128 standard, in LUFS.", min: -30, max: -5 },
//     "Spectral Centroid (Hz)":{ desc: "Average brightness of the sound. Higher values sound brighter/more treble-heavy.", min: 500, max: 5000 },
//     "Dissonance":            { desc: "Average sensory dissonance. Higher means harsher, more clashing frequency content.", min: 0, max: 1 },
//     "Tuning Frequency (Hz)": { desc: "Estimated reference pitch the track is tuned to (concert pitch is conventionally 440 Hz).", min: 420, max: 460 },
//     "Chords Key":            { desc: "Estimated key of the detected chord progression.", categorical: true },
//     "Chords Scale":          { desc: "Mode of the chord progression: major or minor.", categorical: true },
//     "Chords Changes Rate":   { desc: "How frequently the chord changes relative to the track length.", min: 0, max: 1 },
//     "Chords Number Rate":    { desc: "Proportion of unique chords relative to total chords played.", min: 0, max: 1 },
//   };

//   // Low value -> light blue, high value -> deep blue. Swap hue/lightness to taste.
//   function valueToColor(value, min, max) {
//     const num = parseFloat(value);
//     if (Number.isNaN(num)) return "";
//     const t = Math.min(1, Math.max(0, (num - min) / (max - min)));
//     const lightness = 92 - t * 45; // 92% (light) down to 47% (saturated)
//     return `hsl(206, 70%, ${lightness}%)`;
//   }

//   function enhanceTable(tableEl) {
//     const root = tableEl.shadowRoot || tableEl;

//     // Map each header cell's index -> column meta, by matching header text.
//     const headerCells = Array.from(root.querySelectorAll("thead th"));
//     const metaByIndex = headerCells.map((th) => {
//       const name = th.textContent.trim();
//       const meta = COLUMN_META[name];
//       if (meta) th.title = meta.desc; // native on-hover tooltip
//       return meta || null;
//     });

//     // Color each body cell based on its column's range.
//     const rows = root.querySelectorAll("tbody tr");
//     rows.forEach((row) => {
//       const cells = Array.from(row.querySelectorAll("td"));
//       cells.forEach((cell, i) => {
//         const meta = metaByIndex[i];
//         if (!meta || meta.categorical) return;
//         const color = valueToColor(cell.textContent.trim(), meta.min, meta.max);
//         if (color) cell.style.backgroundColor = color;
//       });
//     });
//   }

//   const tableElementRef = document.getElementById("song-analyses-summary");

//   // Re-apply on every render (initial load, sorts, edits, etc).
//   tableElementRef.onRender = () => enhanceTable(tableElementRef);
// }

class Playlist {
  private readonly element: Element;
  private readonly songElements: NodeListOf<Element>;

  private readonly songs: ISong[];

  private currentSongIndex = 0;

  private directoryHandle?: FileSystemDirectoryHandle;
  private audioElement?: HTMLAudioElement;
  private currentObjectUrl?: string;

  constructor(element: Element) {
    this.element = element;
    this.songElements = element.querySelectorAll('.playlist-songs > li');

    console.debug(document.getElementById('playlist-data'));

    this.songs = JSON.parse(document.getElementById('playlist-data')?.innerHTML || '[]') as ISong[];
    console.debug('songs', this.songs);
  }

  async init() {
    this.addSongListControls();

    if (!('storage' in navigator) || !navigator.storage.getDirectory) {
      console.warn('filesystem not supported in this browser, can not store downloaded songs');

      return;
    }

    const opfsRoot = await navigator.storage.getDirectory();
    this.directoryHandle = await opfsRoot.getDirectoryHandle(this.element.id, { create: true });

    // FIXME THis should come from JSON.parse()...
    //const expectedSongFiles = this.getExpectedSongFiles();
    const missingSongFiles = await this.findMissingSongFiles(this.directoryHandle);

    if (missingSongFiles.length === 0) {
      console.debug(`all songs for playlist ${this.element.id} already stored locally, skipping download`);
    } else {
      await this.downloadPlaylist(this.directoryHandle, missingSongFiles);
    }

    this.getAudioElement();
    this.addPlaybackControls();

    await this.loadSong(0, { autoplay: false });
  }

  private addSongListControls() {
    this.songElements.forEach(songElement => {
      songElement.addEventListener('click', async () => {
        const indexAttr = songElement.getAttribute('data-track-index');
        if (indexAttr === null) { return; }

        const index = parseInt(indexAttr, 10);
        if (Number.isNaN(index)) { return; }

        await this.loadSong(index, { autoplay: true });
      });
    });
  }

   private async findMissingSongFiles(directoryHandle: FileSystemDirectoryHandle): Promise<ISong[]> {
    const missing: ISong[] = [];

    for (const expectedSongFile of this.songs) {
      const alreadyStored = await this.fileExistsInOpfs(directoryHandle, expectedSongFile.fileName);

      if (!alreadyStored) {
        missing.push(expectedSongFile);
      }
    }

    return missing;
  }

  private async fileExistsInOpfs(directoryHandle: FileSystemDirectoryHandle, fileName: string): Promise<boolean> {
    try {
      await directoryHandle.getFileHandle(fileName);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotFoundError') {
        return false;
      }
      throw error;
    }
  }

  private async downloadPlaylist(directoryHandle: FileSystemDirectoryHandle, missingSongFiles: ISong[]) {
    const playlistId = this.element.id;

    for (const songFile of missingSongFiles) {
      try {
        const file = await api.downloadPlaylistSong(playlistId, songFile.songId);

        await this.saveFileToOpfs(directoryHandle, songFile.fileName, file);
      } catch (error) {
        console.error('failed to download and save file to filesystem', songFile, error);
        // FIXME Bubble up?
      }
    }
  }

  private async saveFileToOpfs(directoryHandle: FileSystemDirectoryHandle, fileName: string, file: File) {
    const data = await file.arrayBuffer();

    const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();

    console.debug(`saved ${fileName} to filesystem`);
  }

  private async loadSong(index: number, options: { autoplay: boolean }) {
    if (!this.directoryHandle || !this.audioElement) { return; }
    if (index < 0 || index >= this.songs.length) { return; }

    const fileName = this.getFileNameForIndex(index);
    if (!fileName) {
      console.warn(`no playable file for song at index ${index}`);

      return;
    }

    try {
      const fileHandle = await this.directoryHandle.getFileHandle(fileName);
      const file = await fileHandle.getFile();

      if (this.currentObjectUrl) {
        URL.revokeObjectURL(this.currentObjectUrl);
      }

      this.currentObjectUrl = URL.createObjectURL(file);
      this.audioElement.src = this.currentObjectUrl;

      this.updateNowPlaying(index);

      if (options.autoplay) {
        await this.audioElement.play();
      }
    } catch (error) {
      console.error(`failed to load song ${fileName} from filesystem`, error);
    }
  }

  private getFileNameForIndex(index: number): string | undefined {
    const song = this.songs[index];
    if (!song) { return; }

    return song.fileName;
  }

  private updateNowPlaying(index: number) {
    this.currentSongIndex = index;

    const nowPlayingLabel = this.element.querySelector('.playlist-now-playing');
    if (nowPlayingLabel) {
      nowPlayingLabel.innerHTML = this.songs[this.currentSongIndex]['Track Name'];
    }

    this.songElements.forEach(trackElement => trackElement.classList.remove('playlist-track-current'));
    this.songElements.item(index)?.classList.add('playlist-track-current');
  }

  private getAudioElement() {
    this.audioElement = this.element.querySelector<HTMLAudioElement>('.playlist-audio') as HTMLAudioElement;

    this.audioElement.addEventListener('loadedmetadata', () => this.updateProgress());
    this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
    this.audioElement.addEventListener('play', () => this.updatePlayPauseButton(true));
    this.audioElement.addEventListener('pause', () => this.updatePlayPauseButton(false));
    this.audioElement.addEventListener('ended', () => this.playNext());
  }

  private addPlaybackControls() {
    const playPauseButton = this.element.querySelector('.playlist-play-pause');
    const nextButton = this.element.querySelector('.playlist-next');
    const prevButton = this.element.querySelector('.playlist-prev');
    const volumeInput = this.element.querySelector<HTMLInputElement>('.playlist-volume');

    playPauseButton?.addEventListener('click', async () => {
      if (!this.audioElement) { return; }

      if (!this.audioElement.src) {
        await this.loadSong(this.currentSongIndex, { autoplay: true });

        return;
      }

      if (this.audioElement.paused) {
        await this.audioElement.play();
      } else {
        this.audioElement.pause();
      }
    });

    nextButton?.addEventListener('click', async () => {
      await this.playNext();
    });

    prevButton?.addEventListener('click', async () => {
      await this.playPrev();
    });

    volumeInput?.addEventListener('input', () => {
      if (!this.audioElement) { return; }

      this.audioElement.volume = parseFloat(volumeInput.value);
    });
  }

  private async playNext() {
    if (this.currentSongIndex >= this.songs.length - 1) { return; }

    await this.loadSong(this.currentSongIndex + 1, { autoplay: true });
  }

  private async playPrev() {
    if (this.currentSongIndex <= 0) { return; }

    await this.loadSong(this.currentSongIndex - 1, { autoplay: true });
  }

  private updatePlayPauseButton(isPlaying: boolean) {
    const playPauseButton = this.element.querySelector('.playlist-play-pause');
    if (!playPauseButton) { return; }

    playPauseButton.innerHTML = isPlaying ? '⏸' : '▶';
  }

  private updateProgress() {
    if (!this.audioElement) { return; }

    const currentTimeLabel = this.element.querySelector('.playlist-current-time');
    const durationLabel = this.element.querySelector('.playlist-duration');

    if (currentTimeLabel) {
      currentTimeLabel.innerHTML = this.formatTime(this.audioElement.currentTime);
    }

    if (durationLabel) {
      durationLabel.innerHTML = this.formatTime(this.audioElement.duration);
    }
  }

  private formatTime(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) { return '0:00'; }

    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
