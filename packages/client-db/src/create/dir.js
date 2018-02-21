// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbPathPrefixType } from '../types';

const mkdirp = require('mkdirp');
const path = require('path');

module.exports = function createDir (rootDir: string, prefix: DbPathPrefixType, subDir: string): string {
  const location = path.join(rootDir, prefix, subDir);

  mkdirp.sync(location);

  return location;
};
