console.debug('If you know how to catch a ride, you can go places.');

//import '../../../node_modules/normalize.css/normalize.css';
//import '../../../node_modules/milligram/dist/milligram.css';
//import '../styles/index.css';

//import './vendor/css-browser-selector.js'; Load classically. Previously you did it this way w/o vite.

// Polyfills needed until web components are fully supported: https://developer.mozilla.org/en-US/docs/Web/Web_Components#browser_compatibility
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '@lit/reactive-element/polyfill-support.js';

import './events.keyboard';
import './meblog-table';
//import './my-pocket-symphony';

import * as comms from './comms';
import * as constants from './constants';
import Router from './router';
import { frontendState } from './state';
import { tryUpgradePostTableOfContents } from './table-of-contents';
import { tryUpgradeBOMs } from './boms';
import { tryUpgradeBuildScrollshowsToSlideshows } from './build-slideshow';
import { tryUpgrade3DScrollshowsToSlideshows } from './3d-slideshow';
import { tryUpgradeLoginPage } from './login';
import { tryUpgradeOpsDashboard } from './ops';
import { tryUpgradeBookmarksPage } from './bookmarks';
import { tryUpgradePlaylists } from './playlist';
//import * as reader from './reader';
//import { listenForViewModeChanges } from './zine-mode';

comms.bus.subscribe(comms.konamiCodeEnteredEvent, async () => {
  console.debug('konami code entered');

  // FIXME Do something fun with this - no longer used.
  //showLinksToPrivateIshContent();
});

// const showLinksToPrivateIshContent = () => {
//   const footerItems = document.querySelectorAll('.footer-item');
//   footerItems.forEach(footerItem => {
//     footerItem?.classList.remove('private');
//   });
// }

const router = new Router();

// FIXME
//listenForViewModeChanges();

router.register('/posts/', async () => {
  tryUpgradeBOMs();
  tryUpgradePostTableOfContents();
  tryUpgradeBuildScrollshowsToSlideshows();
  tryUpgrade3DScrollshowsToSlideshows();
  await tryUpgradePlaylists();
});

router.register('/bookmarks', async () => {
  tryUpgradeBookmarksPage();
});
router.register('/login', async () => {
  if (frontendState.get().loggedIn) {
    window.location.href = constants.defaultAuthedPage;

    return;
  }

  tryUpgradeLoginPage();
});
router.register('/ops', async () => {
  if (!frontendState.get().loggedIn) {
    window.location.href = constants.defaultUnauthedPage;

    return;
  }

  await tryUpgradeOpsDashboard();
});

const opsDashboardLinkElement = document.getElementById('footer-ops-dashboard-link') as HTMLLinkElement;
if (frontendState.get().loggedIn) {
  opsDashboardLinkElement.removeAttribute('hidden');
}

// Logout isn't an upgrade: the feature is only supported when JavaScript is enabled.
const logoutImageElement = document.getElementById('footer-logout-image') as HTMLImageElement;
frontendState.get().loggedIn ? logoutImageElement.style.visibility = 'visible': logoutImageElement.style.visibility = 'hidden';

const logoutLinkElement = document.getElementById('logout') as HTMLLinkElement;
logoutLinkElement.addEventListener('click', async (event: Event) => {
  event.preventDefault();

  frontendState.setLoggedOut();

  window.location.href = constants.defaultUnauthedPage;
});

router.route(window.location.pathname);

if (globalThis.publish_stage === 'dev') {} // Nothing special to do ATM.

// if (reader.isReaderMode()) {
//   console.debug('enable reader mode');
//   reader.enableReaderMode();
// } else {
//   console.debug('disable reader mode');
//   reader.disableReaderMode();
// }
