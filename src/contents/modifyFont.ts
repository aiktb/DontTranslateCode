import type { PlasmoCSConfig } from 'plasmo';
import Browser from 'webextension-polyfill';

import { Storage } from '@plasmohq/storage';

import { Option } from '~contents/constants';

export const config: PlasmoCSConfig = {
  matches: ['https://*/*'],
  all_frames: true,
};

// The content script generated by plasmo is a nested IIFE, and Top-level await cannot be used.
(async function modifyFont() {
  const storage = new Storage({ area: 'local' });
  const forceConvertFont = await storage.get(Option.forceModifyFont);
  if (!forceConvertFont) {
    return;
  }

  const FONT_NAME = 'Intel One Mono';
  const fontTemplate = (font: string) => `assets/fonts/IntelOneMono-${font}.woff2`;
  const REGULAR_FONT = fontTemplate('Regular');
  const BOLD_FONT = fontTemplate('Bold');
  const ITALIC_FONT = fontTemplate('Italic');
  const BOLD_ITALIC_FONT = fontTemplate('BoldItalic');

  const createFontFace = (font: string) => {
    const FONT_SRC = Browser.runtime.getURL(font);
    return `
      @font-face {
        font-display: swap;
        font-family: '${FONT_NAME}';
        src: url('${FONT_SRC}') format('woff2');
        font-weight: ${font.includes('Bold') ? 'bold' : 'normal'};
        font-style: ${font.includes('Italic') ? 'italic' : 'normal'};
      }`;
  };

  const css = `
    ${createFontFace(REGULAR_FONT)}
    ${createFontFace(BOLD_FONT)}
    ${createFontFace(ITALIC_FONT)}
    ${createFontFace(BOLD_ITALIC_FONT)}

    pre, code {
      font-family: '${FONT_NAME}', monospace !important;
    }`;

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', "don't-translate-code");
  style.textContent = css;

  document.head.appendChild(style);
})();
