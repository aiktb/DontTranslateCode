import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['https://*/*'],
  all_frames: true,
};

export enum Option {
  preventTranslateCode = 'preventTranslateCode',
  forceModifyFont = 'forceModifyFont',
}
