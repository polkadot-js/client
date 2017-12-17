// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { PathPrefixType } from './types';

const os = require('os');
const path = require('path');

const PREFIX_DB: PathPrefixType = 'database';
const PATH = path.join(os.homedir(), '.@polkadot');

module.exports = {
  PREFIX_DB,
  PATH
};
