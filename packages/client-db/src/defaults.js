// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
