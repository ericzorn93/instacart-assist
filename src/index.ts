import { PrimaryUtils } from './utils/primary.utils';

export const sum = (a: number, b: number) => {
  if (PrimaryUtils.isDevelopment()) {
    console.log('boop');
  }

  return a + b;
};
