// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbPathPrefix, DbConfig$Type } from './types';

const os = require('os');
const path = require('path');

const PREFIX_DB: DbPathPrefix = 'database';
const PATH = path.join(os.homedir(), '.@polkadot');
const TYPE: DbConfig$Type = 'memory';

module.exports = {
  PREFIX_DB,
  PATH,
  TYPE
};
