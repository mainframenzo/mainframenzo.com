// This file is responsible for handling Auth API requests.
import _globalThis from '../@types/global-this';

import type { Context } from 'openapi-backend';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { components } from '../openapi-def/types';
import { isEqual } from './utils';

export const login = async (_context: Context<{}>, req: Request, res: Response) => {
  console.trace('login');

  const loginRequest = req.body as components['schemas']['ILoginRequest'];
  //console.debug('loginRequest', loginRequest);

  // JavaScript disabled is not supported.
  // FIXME Render login page on-the-fly with the nojs error.
  if (req.query['nojs']) {
    return res.redirect(`${_globalThis.app_url}/login.html?error=nojs`);
  }

  const username = loginRequest.username;
  const password = loginRequest.password;

  if (
    !username ||
    !password ||
    !isEqual(username, _globalThis.your_username!) ||
    !isEqual(password, _globalThis.your_password!)
  ) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized! The username or password is invalid.', data: {} });
  }

  const bearer_token = jwt.sign({ name: username }, _globalThis.jwt_secret!, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });

  return res.status(200).json({ status: 'ok', message: 'Logged in.', data: { bearer_token }}  as unknown as components['schemas']['IJSendResponse']);
}

