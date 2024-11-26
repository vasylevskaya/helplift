import { atom } from 'recoil';

export const headerThemeState = atom({
  key: 'headerThemeState',
  default: 'light',
});

export const contactFormVisibleState = atom({
  key: 'ContactFormVisibleState',
  default: false,
});

export const animationTextVisibleState = atom({
  key: 'animationTextVisibleState',
  default: false,
});
