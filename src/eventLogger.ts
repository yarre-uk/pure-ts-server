import path from 'path';
import getTime from './getTime.js';
import { appendFile, mkdir } from 'fs/promises';

const DIR_PATH = './logs';

const LOG_PATH = `${DIR_PATH}/logs.txt`;
const ERROR_PATH = `${DIR_PATH}/error.txt`;

await mkdir(path.dirname(DIR_PATH), { recursive: true });

export const logEvent = async (message: string) => {
  const log = `${getTime()} - ${message}`;

  console.log(log);

  await appendFile(LOG_PATH, log + '\n');
};

export const errorEvent = async (error: string) => {
  const log = `${getTime()} - ${error}`;

  console.error(log);

  await appendFile(ERROR_PATH, log + '\n');
};
