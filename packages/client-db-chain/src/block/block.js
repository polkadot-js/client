// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

type Block = {
  get: (hash: Uint8Array) => Uint8Array,
  set: (hash: Uint8Array, block: Uint8Array) => void
};

const { BLOCK_BY_HASH } = require('./keys');

module.exports = function block (db: WrapDbInterface): Block {
  return {
    get: (hash: Uint8Array): Uint8Array =>
      db.get(BLOCK_BY_HASH(hash)),
    set: (hash: Uint8Array, block: Uint8Array): void =>
      db.set(BLOCK_BY_HASH(hash), block)
  };
};
