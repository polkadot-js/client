// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const key = require('../dbState/key');
const { BLOCK_BY_HASH } = require('./prefix');

module.exports = function setBlock (db: BaseDbInterface, hash: Uint8Array, block: Uint8Array): void {
  db.set(
    key(BLOCK_BY_HASH, hash),
    block
  );
};
