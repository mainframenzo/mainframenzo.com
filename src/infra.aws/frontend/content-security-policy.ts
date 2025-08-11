// This file is responsible for providing a content security policy used for any HTTP serving. 
import _globalThis from '../../@types/global-this';

export const getContentSecurityPolicy = (urls: string[]): string => {
  const contentSecurityPolicy = [
    //'trusted-types "none"',
    `base-uri 'self' ${urls.join(' ')}`,
    "default-src 'none'",
    `script-src 'self' ${urls.join(' ')} 'unsafe-eval' 'unsafe-inline' https:`, 
    // FIXME Need to get rid of unsafe-eval...there are dynamically loaded scripts.
    // Either specify them manually (and hope libraries are capable of detecting), 
    //  or fork dependencies. See: https://github.com/protobufjs/protobuf.js/issues/593 https://stackoverflow.com/questions/73076944/esbuild-how-to-prevent-transpiled-js-from-using-eval https://github.com/evanw/esbuild/issues/1006
    //`script-src 'self' ${urls.join(' ')} 'unsafe-inline' 'wasm-unsafe-eval'`,
    //`script-src-elem 'self' ${urls.join(' ')} 'unsafe-inline'`,
    "require-trusted-types-for 'script'",
    `style-src 'self' ${urls.join(' ')} 'unsafe-inline' https:`,
    `img-src 'self' ${urls.join(' ')} data: blob:`,
    `font-src 'self' ${urls.join(' ')} data:`,
    `connect-src 'self' ${urls.join(' ')} blob: ws:`,
    `worker-src 'self' ${urls.join(' ')} blob:`,
    `form-action 'self' ${urls.join(' ')}`,
    "object-src 'self' data: blob:",
    "frame-ancestors 'self' blob:",
    "frame-src https:",
    "media-src https:",
    "upgrade-insecure-requests",
    "block-all-mixed-content",
    `manifest-src 'self' ${urls.join(' ')}`
  ].join('; ');

  return contentSecurityPolicy;
}