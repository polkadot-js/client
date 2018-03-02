// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const key = require('../dbstate/key');
const { BLOCK_BY_HASH } = require('./prefix');

module.exports = function getBlock (db: BaseDbInterface, hash: Uint8Array): Uint8Array {
  return db.get(
    key(BLOCK_BY_HASH, hash)
  );
};
