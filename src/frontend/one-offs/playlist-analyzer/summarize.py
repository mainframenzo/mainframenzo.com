# This file is responsible for outputting a CSV of all the analyses data for a playlist.
# You use this to compare playlist song analyses by rendering a sortable table on a #playlists post.
import argparse
import csv
import json
import re
from collections import Counter
from pathlib import Path


def main():
  argument_parser = argparse.ArgumentParser(description=__doc__)
  argument_parser.add_argument('--csv', default='src/frontend/playlists/pocket-symphonies.csv')
  args = argument_parser.parse_args()

  partial_playlist_data = get_some_playlist_data(args.csv)

  print(list(partial_playlist_data.keys()))

  rows, all_labels = build_table_rows(list(partial_playlist_data.keys()), partial_playlist_data)

  playlist_name = Path(args.csv).stem

  out_csv_path = Path(__file__).resolve(
  ).parent.parent.parent / 'public' / 'playlist-analyzer' / f'summary.{playlist_name}.csv'
  out_json_path = Path(__file__).resolve(
  ).parent.parent.parent / 'public' / 'playlist-analyzer' / f'summary.{playlist_name}.json'

  write_csv_summary(rows, all_labels, out_csv_path)
  write_json_summary(rows, out_json_path)

  report_missing_data(rows)
  print(f'wrote {len(rows)} row(s) to {out_csv_path} and {out_json_path}')


def get_some_playlist_data(csv_path: str) -> dict:
  partial_playlist_data = {}

  with open(csv_path, newline='', encoding='utf-8') as file:
    for row in csv.DictReader(file):
      match = youtube_id_regex.search(row.get('YouTube URL', ''))

      if match:
        partial_playlist_data[match.group(1)] = {
            'track': row.get('Track Name', ''),
            'artist': row.get('Artist Name(s)', ''),
        }
      else:
        print(f"missing metadata for song: {row.get('YouTube URL', '')}")

  return partial_playlist_data


youtube_id_regex = re.compile(r'(?:v=|youtu\.be/)([A-Za-z0-9_-]{6,})')

all_in_one_infer_analyses_results_dir = Path(__file__).resolve(
).parent.parent.parent / 'public' / 'playlist-analyzer' / 'all-in-one-infer' / 'data'
essentia_analyses_results_dir = Path(__file__).resolve(
).parent.parent.parent / 'public' / 'playlist-analyzer' / 'essentia'


def build_table_rows(song_ids: list, partial_playlist_data: dict) -> tuple:
  rows = []
  label_counts_by_song = {}

  for song_id in song_ids:
    print(f'building table row for song {song_id}')

    all_in_one_infer_analysis_data = load_all_in_one_analysis(song_id)
    essentia_analysis_data = load_essentia_analysis(song_id) or {}
    info = partial_playlist_data.get(song_id, {})

    label_counts = count_segment_labels(all_in_one_infer_analysis_data)
    label_counts_by_song[song_id] = label_counts

    rows.append(
        build_row(
            song_id, info, all_in_one_infer_analysis_data, essentia_analysis_data, label_counts
        )
    )

  all_labels = sorted(
      {label
       for label_counts in label_counts_by_song.values()
       for label in label_counts}
  )

  for row in rows:
    counts = label_counts_by_song[row['song_id']]

    for label in all_labels:
      row[f'count_{label}'] = counts.get(label, 0)

  return rows, all_labels


def load_all_in_one_analysis(song_id: str):
  path = all_in_one_infer_analyses_results_dir / f'{song_id}.json'

  if not path.exists():
    return None

  with open(path) as file:
    return json.load(file)


def load_essentia_analysis(song_id: str):
  path = essentia_analyses_results_dir / song_id / f'{song_id}.summary.json'

  if not path.exists():
    return None

  with open(path) as file:
    return json.load(file).get('summary')


def count_segment_labels(all_in_one) -> Counter:
  segments = (all_in_one or {}).get('segments') or []

  return Counter(segment['label'] for segment in segments)


def build_row(
    song_id: str, info: dict, all_in_one, essentia_summary: dict, label_counts: Counter
) -> dict:
  segments = (all_in_one or {}).get('segments') or []

  duration_seconds = essentia_summary.get('duration_seconds')
  if duration_seconds is None and segments:
    duration_seconds = segments[-1]['end']

  row = {
      'song_id': song_id,
      'track': info.get('track', ''),
      'artist': info.get('artist', ''),
      'duration_seconds': duration_seconds,
      'bpm_all_in_one': (all_in_one or {}).get('bpm'),
      'num_segments': sum(label_counts.values()),
      'has_all_in_one': all_in_one is not None,
      'has_essentia': bool(essentia_summary),
  }

  for field in essentia_analysis_field_names:
    row[f'essentia_{field}'] = essentia_summary.get(field)

  return row


essentia_analysis_field_names = [
    'bpm',
    'key',
    'scale',
    'key_strength',
    'danceability',
    'onset_rate',
    'average_loudness',
    'dynamic_complexity',
    'loudness_ebu128_integrated',
    'spectral_centroid_mean',
    'dissonance_mean',
    'tuning_frequency',
    'chords_key',
    'chords_scale',
    'chords_changes_rate',
    'chords_number_rate',
]


def write_csv_summary(rows: list, all_labels: list, out_path: Path):
  base_fields = [
      'song_id',
      'track',
      'artist',
      'duration_seconds',
      'bpm_all_in_one',
      'num_segments',
      'has_all_in_one',
      'has_essentia',
  ] + [f'essentia_{field}' for field in essentia_analysis_field_names]
  fieldnames = base_fields + [f'count_{label}' for label in all_labels]

  out_path.parent.mkdir(parents=True, exist_ok=True)
  with open(out_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)


def write_json_summary(rows: list, out_path: Path):
  out_path.parent.mkdir(parents=True, exist_ok=True)

  with open(out_path, 'w') as f:
    json.dump(rows, f, indent=2)


def report_missing_data(rows: list):
  missing_all_in_one = [row['song_id'] for row in rows if not row['has_all_in_one']]
  missing_essentia = [row['song_id'] for row in rows if not row['has_essentia']]

  if missing_all_in_one:
    print(
        f'note: {len(missing_all_in_one)} song(s) missing all-in-one-infer data: {missing_all_in_one}'
    )

  if missing_essentia:
    print(f'note: {len(missing_essentia)} song(s) missing essentia data: {missing_essentia}')


if __name__ == '__main__':
  main()
