import { join, resolve } from 'path';

const rootPath = resolve(__dirname, '../../'); // Adjust the number of '../' to get to the root directory

export const getRootPath = (...args) => {
  return join(rootPath, ...args);
};
