import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });
log.debug('You do not need JavaScript to view this website!');

import './events.keyboard';
import * as comms from './comms';
import { tryUpgradePostTableOfContents } from './table-of-contents';
import { tryUpgradeBuildScrollshowsToSlideshows } from './build-slideshow';
import { tryUpgrade3DScrollshowsToSlideshows } from './3d-slideshow';

comms.bus.subscribe(comms.konamiCodeEnteredEvent, async () => {
  log.debug('konami code entered');

  showLinksToPrivateIshContent();
});

const showLinksToPrivateIshContent = () => {
  const footerItems = document.querySelectorAll('.footer-item');
  footerItems.forEach(footerItem => {
    footerItem?.classList.remove('private');
  });
}

tryUpgradePostTableOfContents();
tryUpgradeBuildScrollshowsToSlideshows();
tryUpgrade3DScrollshowsToSlideshows();

if (globalThis.publish_stage === 'dev') {} // Nothing special to do ATM.