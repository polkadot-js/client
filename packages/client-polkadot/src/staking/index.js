// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotInterface$Staking } from '../types';

const getBalance = require('./getBalance');
const setBalance = require('./setBalance');
const setCurrentEra = require('./setCurrentEra');
const setIntent = require('./setIntent');
const setIntentLength = require('./setIntentLength');
const setSessionsPerEra = require('./setSessionsPerEra');
const setValidatorCount = require('./setValidatorCount');

module.exports = function staking (db: BaseDbInterface): PolkadotInterface$Staking {
  return {
    getBalance: (publicKey: Uint8Array): BN =>
      getBalance(db, publicKey),
    setBalance: (publicKey: Uint8Array, value: BN | number): void =>
      setBalance(db, publicKey, value),
    setCurrentEra: (era: BN | number): void =>
      setCurrentEra(db, era),
    setIntent: (id: BN | number, publicKey: Uint8Array): void =>
      setIntent(db, id, publicKey),
    setIntentLength: (length: BN | number): void =>
      setIntentLength(db, length),
    setSessionsPerEra: (count: BN | number): void =>
      setSessionsPerEra(db, count),
    setValidatorCount: (count: BN | number): void =>
      setValidatorCount(db, count)
  };
};
