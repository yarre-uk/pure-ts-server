import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const EVENT = {
  LOG: 'LOG',
};

const dir = dirname(fileURLToPath(import.meta.url));
export const __dirname = dir.slice(0, dir.indexOf('\\src'));

export const PORT = process.env.PORT || 3500;
