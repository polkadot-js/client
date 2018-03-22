// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';

type Balance = {
  get: (Uint8Array) => BN,
  set: (Uint8Array, value: BN | number) => void
};

const { BALANCE_OF } = require('./keys');

module.exports = function balance (db: WrapDbInterface): Balance {
  return {
    get: (publicKey: Uint8Array): BN =>
      db.getBn64(BALANCE_OF(publicKey)),
    set: (publicKey: Uint8Array, value: BN | number): void =>
      db.setBn64(BALANCE_OF(publicKey), value)
  };
};
