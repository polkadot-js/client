// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotInterface$Staking } from '../types';

const getBalance = require('./getBalance');
const setBalance = require('./setBalance');

module.exports = function staking (db: BaseDbInterface): PolkadotInterface$Staking {
  return {
    getBalance: (publicKey: Uint8Array): BN =>
      getBalance(db, publicKey),
    setBalance: (publicKey: Uint8Array, value: BN | number): void =>
      setBalance(db, publicKey, value)
  };
};
