// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const { BLOCK_BY_HASH } = require('./keys');

module.exports = function setBlock (db: WrapDbInterface, hash: Uint8Array, block: Uint8Array): void {
  db.set(BLOCK_BY_HASH(hash), block);
};
