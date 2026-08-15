# This file is responsible for using essentia to analyze a playlist song.
import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path
import essentia.standard as es
import numpy as np


def main():
  argument_parser = argparse.ArgumentParser(description=__doc__)
  argument_parser.add_argument('files', nargs='+', type=Path)
  args = argument_parser.parse_args()

  analyses_results_dir.mkdir(parents=True, exist_ok=True)

  for file_path in args.files:
    if not file_path.is_file():
      print(f'warning: skipping missing file {file_path}', file=sys.stderr)
      continue

    analyze_song(file_path, analyses_results_dir)


analyses_results_dir = Path(__file__).resolve(
).parent.parent.parent / 'public' / 'playlist-analyzer' / 'essentia'


def analyze_song(song_file_path: Path, out_dir: Path):
  song_id = song_file_path.stem
  song_analysis_results_dir = out_dir / song_id
  song_analysis_results_dir.mkdir(parents=True, exist_ok=True)

  print(f'analyzing {song_file_path.name}')

  with tempfile.TemporaryDirectory() as tmp:
    wav_path = Path(tmp) / f'{song_id}.wav'
    song_to_wav(song_file_path, wav_path)

    extractor = es.MusicExtractor(
        lowlevelStats=['mean', 'stdev'],
        rhythmStats=['mean', 'stdev'],
        tonalStats=['mean', 'stdev'],
    )
    features, _features_frames = extractor(str(wav_path))
    rms = compute_rms(wav_path)

  features_dict = essentia_pool_to_dict(features)

  features_path = song_analysis_results_dir / f'{song_id}.features.json'
  with open(features_path, 'w') as f:
    json.dump({'name': song_id, 'features': features_dict}, f, indent=2, sort_keys=True)

  summary_path = song_analysis_results_dir / f'{song_id}.summary.json'
  with open(summary_path, 'w') as f:
    json.dump({'name': song_id, 'summary': build_summary(features_dict, rms)}, f, indent=2)

  print(f'saved analysis features data: {features_path}')
  print(f'saved analysis summary data: {summary_path}')


def song_to_wav(song_file_path: Path, wav_path: Path):
  subprocess.run(
      [
          'ffmpeg',
          '-y',
          '-v',
          'error',
          '-i',
          str(song_file_path),
          '-vn',
          '-ac',
          '2',
          '-ar',
          '44100',
          '-sample_fmt',
          's16',
          str(wav_path),
      ],
      check=True
  )


# Compute a downnsampled RMS for visualization.
# There are always the same number of samples otherwise the output size
#  would scale with the song's length.
def compute_rms(wav_path: Path, target_points: int = 600) -> list:
  audio = es.MonoLoader(filename=str(wav_path), sampleRate=44100)()

  frame_size = 2048
  hop_size = 1024
  rms_algo = es.RMS()

  frame_values = [
      float(rms_algo(frame)) for frame in
      es.FrameGenerator(audio, frameSize=frame_size, hopSize=hop_size, startFromZero=True)
  ]

  if not frame_values:
    return []

  frame_array = np.array(frame_values, dtype=np.float64)
  if len(frame_array) <= target_points:
    return frame_array.tolist()

  bucket_edges = np.linspace(0, len(frame_array), target_points + 1).astype(int)

  return [
      float(frame_array[start:end].mean()) if end > start else 0.0
      for start, end in zip(bucket_edges[:-1], bucket_edges[1:])
  ]


def essentia_pool_to_dict(pool) -> dict:
  data = {}

  for descriptor in pool.descriptorNames():
    value = pool[descriptor]

    if hasattr(value, 'tolist'):
      value = value.tolist()

    data[descriptor] = value

  return data


# You use this data in playlist song comparison tables.
def build_summary(features, rms) -> dict:
  extracted_features = features.get

  return {
      'duration_seconds': extracted_features('metadata.audio_properties.length'),
      'sample_rate': extracted_features('metadata.audio_properties.sample_rate'),
      'bpm': extracted_features('rhythm.bpm'),
      'beats_count': extracted_features('rhythm.beats_count'),
      'beats_position': extracted_features('rhythm.beats_position'),
      'onset_rate': extracted_features('rhythm.onset_rate'),
      'danceability': extracted_features('rhythm.danceability'),
      'key': extracted_features('tonal.key_key'),
      'scale': extracted_features('tonal.key_scale'),
      'key_strength': extracted_features('tonal.key_strength'),
      'chords_key': extracted_features('tonal.chords_key'),
      'chords_scale': extracted_features('tonal.chords_scale'),
      'chords_changes_rate': extracted_features('tonal.chords_changes_rate'),
      'chords_number_rate': extracted_features('tonal.chords_number_rate'),
      'tuning_frequency': extracted_features('tonal.tuning_frequency'),
      'average_loudness': extracted_features('lowlevel.average_loudness'),
      'dynamic_complexity': extracted_features('lowlevel.dynamic_complexity'),
      'loudness_ebu128_integrated': extracted_features('lowlevel.loudness_ebu128.integrated'),
      'spectral_centroid_mean': extracted_features('lowlevel.spectral_centroid.mean'),
      'dissonance_mean': extracted_features('lowlevel.dissonance.mean'),
      'rms': rms,
  }


if __name__ == '__main__':
  main()
