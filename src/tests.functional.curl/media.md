# Media API
These docs are executable as bash scripts and used in functional tests. See `<meblog-src>/.justfiles/backend.just` for test setup.

## Media API / Background
You have playlists on your website that are rendered in two flavors: the public sees links to YouTube videos (FIXME get embed urls and make the playlist playable), but you see links to audio files you can play. This only works in the foreground on mobile currently, but FIXME it might be possible to play in the background: https://www.reddit.com/r/browsers/comments/1geyb1j/solved_what_is_the_best_smartphone_web_browser/ .

## Media API / Pre-reqs
Run the backend locally. Run the Auth API curl-based functional test to login.
```bash
export bearer_token=$(cat /tmp/meblog-test-token)
```

## Media API / Convert Playlist
FIXME This API is a WIP still!
