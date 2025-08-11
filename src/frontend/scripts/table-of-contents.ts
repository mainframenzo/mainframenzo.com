// This file is responsible for upgrading the table of contents -> content navigation experience.
import * as log from 'ts-app-logger';

// Gets executed on page load and page may not be a post.
export const tryUpgradePostTableOfContents = () => {
  window.addEventListener('hashchange', () => {
    log.debug('hashchange', window.location.hash);

    const element = document.getElementById(window.location.hash.replace('#', ''));
    if (!element) { return; } // Bad mainframenzo, bad.

    element.classList.add('hash-routed');

    setTimeout(() => {  element.classList.remove('hash-routed'); }, 1 * 1000);
  });
};
