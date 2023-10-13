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
  const FONT_FILE = 'assets/IntelOneMono-Regular.woff2';
  const FONT_URL = Browser.runtime.getURL(FONT_FILE);

  const css = `
    @font-face {
      font-display: swap;
      font-family: '${FONT_NAME}';
      font-weight: normal;
      font-style: normal;
      src: url(${FONT_URL}) format('woff2');
    }

    pre, code {
      font-family: '${FONT_NAME}', monospace !important;
    }`;

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = css;
  document.head.appendChild(style);
})();
