// This file is responsible for handling reader mode.
import { Readability } from '@mozilla/readability';

export const isReaderMode = () => {
  try {
    const url = new URL(window.location.href);
    return url.protocol === 'about:' && url.pathname.startsWith('reader');
  } catch (_) {
    return false; // Malformed string is not a valid URL.
  }
}

export const enableReaderMode = () => {
  // Do not modify live elements.
  const documentClone = document.cloneNode(true) as Document;

  const article = new Readability(documentClone).parse();

  if (!article) {
    console.error('could not parse reader mode for this page');

    return;
  }

  const readerOverlay = document.createElement('div');
  readerOverlay.id = 'custom-reader-overlay';

  readerOverlay.innerHTML = `
    <div class='reader-container'>
      <button class='exit-btn' onclick="document.getElementById('custom-reader-overlay').remove()">
        Exit Reader Mode
      </button>
      <h1>${article.title}</h1>
      ${article.byline ? `<p class='author'>By ${article.byline}</p>` : ''}
      <hr>
      <div class='reader-content'>${article.content}</div>
    </div>
  `;

  document.body.appendChild(readerOverlay);
}

export const disableReaderMode = () => {

}
