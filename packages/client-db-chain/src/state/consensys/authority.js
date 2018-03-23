// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Consensys$Authority } from './types';

const bnToU8a = require('@polkadot/util/bn/toU8a');

const { AUTHORITY_H, AUTHORITY_U } = require('./keys');

function key (id: BN | number): Uint8Array {
  return bnToU8a(id, 32, true);
}

module.exports = function authority (db: WrapDbInterface): ChainDb$State$Consensys$Authority {
  return {
    get: (id: BN | number): Uint8Array =>
      db.get(AUTHORITY_H(key(id))),
    set: (id: BN | number, publicKey: Uint8Array): void => {
      db.set(AUTHORITY_H(key(id)), publicKey);
      db.set(AUTHORITY_U(key(id)), publicKey);
    }
  };
};
