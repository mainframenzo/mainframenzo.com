// This file is responsible for listening to keyboard events and delegating business logic.
import * as comms from './comms';

let cursor = 0;
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
document.addEventListener('keydown', (event: any) => {
  cursor = (event.keyCode == konamiCode[cursor]) ? cursor + 1 : 0;
  if (cursor == konamiCode.length) { 
    comms.konamiCodeEntered({}); 

    cursor = 0;
  }
});

document.addEventListener('keydown', (event: any) => {
  if (event.keyCode === 37) {
    comms.previousSlide({});
  } else if (event.keyCode === 39) {
    comms.nextSlide({});
  }
});