// This file and the .gitignore file are responsible for defining what files do not make it to the public version of this source.
export const dirsToScrub = [
  'config/dev-cert',
  'config/prod-cert',

  'src/infra.hetzner/load-test-server/.terraform',
  'src/infra.hetzner/load-test-server/terraform.tfstate.d',
  'src/infra.hetzner/server/.terraform',
  'src/infra.hetzner/server/terraform.tfstate.d',

  'src/frontend/playlists/sources', // From Spotify.
  'src/frontend/playlists/converted', // Converted to your format.
  'src/frontend/playlists/wip',
  'src/frontend/one-offs/posts',
  'src/frontend/one-offs/zine-mode-intro',
  'src/frontend/public/images/drawings',
  'src/frontend/public/images/vehicles',

  'src/load-test',
  'src/pen-test',

  'src/firefox-extension',
  'src/vscode-extension',
];

export const filesToScrub = [
  '.conda/meblog.freecad.yaml',

  'build-utils/bin/yt-dlp_linux',

  'config/.env.backup',

  'src/backend/monitoring-linux-malware-api.sh',

  //'src/frontend/templates.pages/resume.ejs',
  'src/frontend/templates.pages/resume-private.ejs',

  'src/frontend/scripts/my-pocket-symphony.ts',
  'src/frontend/scripts/song-analysis.ts',

  'src/frontend/public/downloads/bookmarks-private.html',

  'src/frontend/playlists/pop-punk.csv',

  'src/frontend/public/downloads/resume-private.pdf',
  'src/frontend/public/downloads/resume-private.png',

  'src/frontend/public/fonts/handwriting-sample-cursive.jpg',
  'src/frontend/public/fonts/handwriting-sample-cursive.pdf',
  'src/frontend/public/fonts/handwriting-sample-std.jpg',
  'src/frontend/public/fonts/handwriting-sample-std.pdf',
  'src/frontend/public/fonts/mainframenzo-cursive.ttf',
  'src/frontend/public/fonts/mainframenzo-std.ttf',

  'src/parts-library-tools/playground-2d-physics.py',
  'src/parts-library-tools/playground-analyze-something-of-stl-with-freecad-elmer.py',
  'src/parts-library-tools/playground-assembly-parts-to-cad-drawings.py',
  'src/parts-library-tools/playground-assembly-to-cad-drawings.py',
  'src/parts-library-tools/playground-circuit-to-svg.py',
  'src/parts-library-tools/playground-fem-gen.py',
  'src/parts-library-tools/playground-generate-code-from-scan.py',
  'src/parts-library-tools/playground-simulation.py',
  'src/parts-library-tools/playground-topology-optimization-with-beso.py',
  'src/parts-library-tools/playground-render-assembly-as-gif-with-bd-animation.py',

  // FIXME These are drafts but they're getting pushed to Github. WTF?
  // You are pretty sure this was because they were marked as #playlists not #playlist,
  //  but you fixed that, so double check that this was fixed.
  'src/frontend/posts/Playlist - Pocket Symphonies.md',
  'src/frontend/posts/Playlist - Pop Punk.md',

  'knockdown.md',

  'readme.private.md'
];
