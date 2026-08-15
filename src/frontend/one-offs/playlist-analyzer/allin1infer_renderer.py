# This file is responsible for using all-in-one-infer to render the analyses of playlist songs.
import argparse
import csv
import io
import re
from pathlib import Path
from PIL import Image
import allin1_infer

import matplotlib

matplotlib.use('Agg')
import matplotlib.pyplot as plt


def main():
  argument_parser = argparse.ArgumentParser(description=__doc__)
  argument_parser.add_argument('--csv', default='src/frontend/playlists/pocket-symphonies.csv')
  argument_parser.add_argument('--sort', choices=['bpm', 'duration', 'name'], default='bpm')
  argument_parser.add_argument('--descending', action='store_true')
  args = argument_parser.parse_args()

  partial_playlist_data = get_some_playlist_data(args.csv)

  infer_analyses_results = sorted(Path(analyses_results_dir).glob('*.json'))

  if not infer_analyses_results:
    raise SystemExit(f'No all-in-one-infer results found in {analyses_results_dir}')

  results = [allin1_infer.load_result(p) for p in infer_analyses_results]

  # You generate individual visualization images and also a group image, sorted.
  sort_key = {
      'bpm': lambda r: r.bpm,
      'duration': duration_of,
      'name': lambda r: partial_playlist_data.get(r.path.stem, {}).get('track', r.path.stem).lower()
  }[args.sort]

  results.sort(key=sort_key, reverse=args.descending)

  visuals_out_dir.mkdir(parents=True, exist_ok=True)

  print(f'rendering {len(results)} tracks')
  figures = allin1_infer.visualize(results, multiprocess=False)

  longest_duration = max(duration_of(r) for r in results)

  fixed_width_images = []
  concatted_images = []
  for result, figure in zip(results, figures):
    song_id = result.path.stem
    info = partial_playlist_data.get(song_id, {})
    track = info.get('track', song_id)
    artist = info.get('artist', '')
    figure.axes[0].set_title(f'{track} — {artist}  ({result.bpm} BPM)')

    # Render individual song visualizaton.
    out_path = visuals_out_dir / f'{song_id}.png'
    figure.savefig(out_path, dpi=150, bbox_inches='tight')
    print(f'saved {out_path}')

    duration = duration_of(result)
    annotate_pixels_per_second(figure, duration)
    fixed_width_images.append(figure_to_image_fixed_width(figure))

    rescale_figure_width(figure, duration, longest_duration)
    concatted_images.append(figure_to_image_concatted(figure))

    plt.close(figure)

  print(f'saved {len(results)} individual image(s) to {visuals_out_dir}/')

  playlist_name = Path(args.csv).stem

  fixed_width_group_image_path = visuals_out_dir / f'{playlist_name}.fixed-width.png'
  save_group_image(fixed_width_images, fixed_width_group_image_path)
  print(f'saved fixed-width group image to {fixed_width_group_image_path}')

  concatted_group_image_path = visuals_out_dir / f'{playlist_name}.concatted.png'
  save_group_image(concatted_images, concatted_group_image_path)
  print(f'saved concatted group image to {concatted_group_image_path}')


analyses_results_dir = Path(__file__).resolve(
).parent.parent.parent / 'public' / 'playlist-analyzer' / 'all-in-one-infer' / 'data'
visuals_out_dir = Path(__file__).resolve(
).parent.parent.parent / 'public' / 'playlist-analyzer' / 'all-in-one-infer' / 'visuals'


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


def duration_of(result):
  return result.segments[-1].end if result.segments else 0.0


# 2 different group images are rendered:
# * song length determines figure width (concatted individual images)
# * all widths are same
# For the latter, label the pixels per second. FIXME This is currently on both images.
def annotate_pixels_per_second(figure: matplotlib.figure.Figure, duration: float):
  if duration <= 0:
    return

  pixels_per_second = (fixed_figure_width_inches * fixed_figure_dpi) / duration
  figure.text(
      0.995,
      0.02,
      f'{duration:.0f}s over {fixed_figure_width_inches:g}in -> {pixels_per_second:.2f} px/s',
      ha='right',
      va='bottom',
      fontsize=6,
      color='0.4'
  )


fixed_figure_dpi = 150


def rescale_figure_width(
    fig: matplotlib.figure.Figure, duration: float, longest_duration: float
) -> None:
  height = fig.get_size_inches()[1]
  width = fixed_figure_width_inches * (
      duration / longest_duration
  ) if longest_duration else fixed_figure_width_inches
  width = max(min_figure_width_inches, width)
  fig.set_size_inches(width, height, forward=True)


fixed_figure_width_inches = 12.0  # This comes from all-in-one-infer's built-in visualize.
min_figure_width_inches = 3.0  # For very short tracks.


def figure_to_image_concatted(figure: matplotlib.figure.Figure, dpi: int = 150) -> Image.Image:
  width_in, _ = figure.get_size_inches()
  left = concatted_left_margin_inches / width_in
  right = 1 - (concatted_right_margin_inches / width_in)
  figure.subplots_adjust(left=left, right=right)

  buf = io.BytesIO()
  figure.savefig(buf, format='png', dpi=dpi)
  buf.seek(0)

  return Image.open(buf).convert('RGB')


concatted_left_margin_inches = 0.5
concatted_right_margin_inches = 0.05


def figure_to_image_fixed_width(figure: matplotlib.figure.Figure, dpi: int = 150) -> Image.Image:
  figure.subplots_adjust(left=0.06, right=0.985, top=0.90, bottom=0.28)
  buf = io.BytesIO()
  figure.savefig(buf, format='png', dpi=dpi)
  buf.seek(0)

  return Image.open(buf).convert('RGB')


def save_group_image(images: list[Image.Image], out_path: Path) -> None:
  width = max(im.width for im in images)
  total_height = sum(im.height for im in images)
  combined = Image.new('RGB', (width, total_height), 'white')

  y = 0
  for image in images:
    combined.paste(image, (0, y))
    y += image.height

  combined.save(out_path)


if __name__ == '__main__':
  main()
