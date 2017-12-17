// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { PathPrefixType } from '../types';

const mkdirp = require('mkdirp');
const path = require('path');

const assert = require('@polkadot/util/assert');
const isString = require('@polkadot/util/is/string');

module.exports = function createDir (root: string, sub: PathPrefixType, name: string): string {
  assert(isString(root), 'Expected root path');
  assert(isString(sub), 'Expected sub path');
  assert(isString(name), 'Expected name');

  const location = path.join(root, sub, name);

  mkdirp.sync(location);

  return location;
};
