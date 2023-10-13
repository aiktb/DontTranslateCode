import type { PlasmoCSConfig } from 'plasmo';
import Browser from 'webextension-polyfill';

export const config: PlasmoCSConfig = {
  matches: ['https://*/*'],
  all_frames: true,
};

(function modifyFont() {
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
