import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  all_frames: true,
};

export enum Option {
  preventTranslateCode = 'preventTranslateCode',
  forceModifyFont = 'forceModifyFont',
}
