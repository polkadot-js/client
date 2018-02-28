// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const key = require('../key');
const { CODE } = require('./prefix');

module.exports = function getCode (db: BaseDbInterface): Uint8Array {
  return db.get(key(CODE, null, false));
};
