// This file is responsible for providing bookmarks data.
// It's pretty naive and is prone to breaking.
import * as fs from 'node:fs';

import * as iface from './iface';

export const getBookmarks = (): iface.IBookmark[] => {
  return parseBookmarksExportFile() // Latest first.
    .sort((a, b) => Number(b.addDate ?? 0) - Number(a.addDate ?? 0));
}

// Parse a bookmark file (Netscape format, e.g. Firefox export).
const parseBookmarksExportFile = (): iface.IBookmark[] => {
  const filePath = `${process.cwd()}/src/frontend/public/downloads/bookmarks.html`;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split(/\r?\n/);

  const bookmarks: iface.IBookmark[] = [];
  const bookmarkFolderStack: string[] = [];

  let pendingFolderName: string | null = null;
  let lastBookmark: iface.IBookmark | null = null; // For attaching a trailing <DD> note.

  for (const rawLine of lines) {
    const line = rawLine.trim();

    const h3Match = line.match(/<DT><H3(?:\s[^>]*)?>(.*?)<\/H3>/i);
    if (h3Match) {
      pendingFolderName = h3Match[1];
      lastBookmark = null;

      continue;
    }

    if (line === '<DL><p>' || line === '<DL>') {
      if (pendingFolderName !== null) {
        bookmarkFolderStack.push(pendingFolderName);
        pendingFolderName = null;
      }

      continue; // Otherwise this is the root <DL>.
    }

    if (line === '</DL><p>' || line === '</DL>') {
      bookmarkFolderStack.pop();
      lastBookmark = null;

      continue;
    }

    const aMatch = line.match(/<DT><A(\s[^>]*)>(.*?)<\/A>/i);
    if (aMatch) {
      const [_, attrString, title] = aMatch;
      const url = getAttribute(attrString, 'HREF');

      if (!url) {
        lastBookmark = null;

        continue; // Skip.
      }

      const bookmark: iface.IBookmark = {
        title,
        url,
        addDate: getAttribute(attrString, 'ADD_DATE'),
        lastModified: getAttribute(attrString, 'LAST_MODIFIED'),
        folderPath: [...bookmarkFolderStack],
      };

      bookmarks.push(bookmark);
      lastBookmark = bookmark; // A <DD> on the next line belongs to this one.

      continue;
    }

    const ddMatch = line.match(/^<DD>(.*?)(?:<\/DD>)?$/i);
    if (ddMatch && lastBookmark) {
      lastBookmark.notes = ddMatch[1];
    }

    lastBookmark = null; // Blank, unmatched, etc. lines breaks the <DD> association.
  }

  return bookmarks;
}

// Export from Firefox contains double quotes (private bookmarks),
//  but you use single-quotes when manually crafting.
const getAttribute = (tag: string, attributeString: string): string | undefined => {
  const match = tag.match(new RegExp(`${attributeString}=(?:"([^"]*)"|'([^']*)')`, 'i'));
  if (!match) { return undefined; }

  return match[1] !== undefined ? match[1] : match[2];
}
