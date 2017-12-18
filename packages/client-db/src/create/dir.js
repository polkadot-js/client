// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { PathPrefixType } from '../types';

const mkdirp = require('mkdirp');
const path = require('path');

module.exports = function createDir (root: string, sub: PathPrefixType, name: string): string {
  const location = path.join(root, sub, name);

  mkdirp.sync(location);

  return location;
};
