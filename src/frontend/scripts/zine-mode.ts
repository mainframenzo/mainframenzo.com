// This file is responsible for providing a "zine" / "dear reader" mode (you can't decide on a name).
// You've always wanted to write a zine, but the format was constricting - now's your chance!
// Zine mode transforms the website in the following ways:
// * All text (including nav text) is your handwritten font
// * There's an "intro" animation
// FIXME May drop the handwriting font and just turn the website into a PDF with pages -
//  the handwriting font does not look that great.
let globalViewMode: ViewMode = 'boring'; // FIXME use globalThis?

type ViewMode = 'boring' | 'zine';

// Gets executed on page load and page may not be a post.
export const listenForViewModeChanges = () => {
  const element = document.getElementById('dear-reader-mode') as HTMLElement;

  element.addEventListener('click', () => {
    changeViewMode(globalViewMode === 'boring' ? 'zine' : 'boring');
  });
}

const changeViewMode = (viewMode: ViewMode) => {
  if (globalViewMode === viewMode) { return; }
  
  globalViewMode = viewMode;

  switch (globalViewMode) {
    case 'zine':
      setZineViewMode();
      break;
    case 'boring':
      setBoringViewMode();
      break;
    default:
      setBoringViewMode();
      break;
  }
};

const setZineViewMode = () => {
  //const element = document.getElementById('dear-reader-mode') as HTMLElement;

  console.debug('setting font to mainframenzo...');

  document.body.style.fontFamily = 'mainframenzo-std';
}

const setBoringViewMode = () => {
  // FIXME
}