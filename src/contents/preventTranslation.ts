import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['https://*/*'],
  all_frames: true,
};

(function preventTranslation() {
  const preElements = document.getElementsByTagName('pre');
  for (const pre of preElements) {
    pre.setAttribute('translate', 'no');
  }

  const observer = new MutationObserver((records) => {
    const preElements = records
      .filter((record) => record.type === 'childList')
      .flatMap((record) => Array.from(record.addedNodes))
      .filter((node) => node.nodeType === Node.ELEMENT_NODE)
      .flatMap((node) => Array.from((node as Element).querySelectorAll('pre')));

    for (const pre of preElements) {
      pre.setAttribute('translate', 'no');
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
