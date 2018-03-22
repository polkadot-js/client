// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

type BestHash = {
  get: () => Uint8Array,
  set: (hash: Uint8Array) => void
};

const { BEST_HASH } = require('./keys');

module.exports = function bestHash (db: WrapDbInterface): BestHash {
  return {
    get: (): Uint8Array =>
      db.get(BEST_HASH()),
    set: (hash: Uint8Array): void =>
      db.set(BEST_HASH(), hash)
  };
};
