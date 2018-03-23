// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking$Balance } from './types';

const { BALANCE_OF } = require('./keys');

module.exports = function balance (db: WrapDbInterface): ChainDb$State$Staking$Balance {
  return {
    get: (publicKey: Uint8Array): BN =>
      db.getBn64(BALANCE_OF(publicKey)),
    set: (publicKey: Uint8Array, value: BN | number): void =>
      db.setBn64(BALANCE_OF(publicKey), value)
  };
};
