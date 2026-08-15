// This file is responsible for providing an API client.
// FIXME Your laziness with JSend response definitions somewhat created
//  the need for this, but also you really just want a generated client
//  that corresponds to operation names.
import { Fetcher } from 'openapi-typescript-fetch';

import { paths, components } from '../../openapi-def/types';
import { frontendState } from './state';

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: globalThis.app_location === 'local' ? globalThis.api_url : window.location.origin,
  init: {
    headers: {
      Authorization: `Bearer ${frontendState.get().bearer_token}`
    },
  }
});

export const login = async (username: string, password: string) => {
  console.trace('login');

  const loginRequest = fetcher.path('/api/auth/login').method('post').create();

  const response = await loginRequest({ username, password });
  console.debug('response', response);

  const jsendResponse = response.data as components['schemas']['IJSendResponse'];
  const loginResponse = jsendResponse.data as unknown as components['schemas']['ILoginResponse'];
  if (!loginResponse.bearer_token) { throw new Error('Missing auth token'); }

  frontendState.setLoggedIn(loginResponse.bearer_token);
}

export const downloadPlaylistSong = async (playlistId: string, songId: string) => {
  console.trace('downloadPlaylistSong');

  const downloadPlaylistSongRequest = fetcher.path('/api/media/download-playlist-song/{playlistId}/{songId}').method('get').create();

  const response = await downloadPlaylistSongRequest({ playlistId, songId });
  console.debug('response', response);

  if (!response.ok) {
    throw new Error(response.data.message);
  }

  const base64FileContents = response.data.data as string;

  return base64StringToWebmFile(base64FileContents, `${songId}.webm`);
}

const base64StringToWebmFile = (base64String: string, fileName: string): File => {
  const base64Data = base64String.split(',')[1] || base64String; // Remove the Data URI prefix if it exists.
  const byteCharacters = atob(base64Data); // Decode the base64 string to a binary string.

  // Create an array of byte values.
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers); // Convert to a typed array.

  return new File([byteArray], fileName, { type: 'video/webm' });
}

export const getOpsDashboard = async (): Promise<string> => {
  console.trace('getOpsDashboard');

  const getOpsDashboardRequest = fetcher.path('/api/ops').method('get').create();

  const response = await getOpsDashboardRequest({ 'metricWindow': frontendState.get().metricWindow || '1d' }); // FIXME Pull from window query params to force render-on-the-fly { render: 'true' });
  console.debug('response', response);

  return response.data as string;
}
