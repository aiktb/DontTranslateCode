import Browser from 'webextension-polyfill';

import { Storage } from '@plasmohq/storage';

import { Option } from '~contents/constants';

const storage = new Storage({ area: 'local' });
Browser.runtime.onInstalled.addListener(async () => {
  const oldOptions = {
    onOffExtension: await storage.get(Option.preventTranslation),
    forceConvertFont: await storage.get(Option.forceModifyFont),
  };

  // Set default options value.
  if (!oldOptions.onOffExtension) {
    await storage.set(Option.preventTranslation, true);
  }
  if (!oldOptions.forceConvertFont) {
    await storage.set(Option.forceModifyFont, false);
  }
});
