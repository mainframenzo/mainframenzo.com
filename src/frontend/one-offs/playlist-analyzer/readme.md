# One-offs / Playlist Analyzer
This software provides a playlist analyzer. It is used to generate analyses used in #playlists posts to help you and others understand the songs better.

To setup the analyzer, from a terminal, run:
```bash
just -f ./.justfiles/one-offs.playlist-analyzer.just --working-directory . setup
```

To analyze a playlist with _all-in-one-infer_, from a terminal within the cwd of the root directory of this source, run:
```bash
just -f ./.justfiles/one-offs.playlist-analyzer.just --working-directory . run-all-in-one-infer-analyzer local $(pwd)/src/frontend/playlists/pocket-symphonies.csv
```

To analyze a playlist with _essentia_, from a terminal within the cwd of the root directory of this source, run:
```bash
just -f ./.justfiles/one-offs.playlist-analyzer.just --working-directory . run-essentia-analyzer local $(pwd)/src/frontend/playlists/pocket-symphonies.csv
```

To build a table summary of a playlists' analyses, from a terminal within the cwd of the root directory of this source, run:
```bash
just -f ./.justfiles/one-offs.playlist-analyzer.just --working-directory . summarize $(pwd)/src/frontend/playlists/pocket-symphonies.csv
```
