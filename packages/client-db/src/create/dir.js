// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { PathPrefixType } from '../types';

const mkdirp = require('mkdirp');
const path = require('path');

module.exports = function createDir (rootDir: string, prefix: PathPrefixType, subDir: string): string {
  const location = path.join(rootDir, prefix, subDir);

  mkdirp.sync(location);

  return location;
};
