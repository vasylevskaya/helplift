import { atom } from 'recoil';

export const headerThemeState = atom({
  key: 'headerThemeState',
  default: 'light',
});

export const contactFormVisibleState = atom({
  key: 'ContactFormVisibleState',
  default: false,
});

export const animationDisabledState = atom({
  key: 'animationDisabledState',
  default: false,
});