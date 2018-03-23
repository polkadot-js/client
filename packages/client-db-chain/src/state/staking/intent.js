// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking$Intent } from './types';

const bnToU8a = require('@polkadot/util/bn/toU8a');

const { INTENT_WILL } = require('./keys');

function key (id: BN | number): Uint8Array {
  return INTENT_WILL(bnToU8a(id, 32, true));
}

module.exports = function intent (db: WrapDbInterface): ChainDb$State$Staking$Intent {
  return {
    get: (id: BN | number): Uint8Array =>
      db.get(key(id)),
    set: (id: BN | number, publicKey: Uint8Array): void =>
      db.set(key(id), publicKey)
  };
};
