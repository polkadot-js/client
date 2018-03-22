// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking } from '../../types';

const createBalance = require('./balance');
const setCurrentEra = require('./setCurrentEra');
const setIntent = require('./setIntent');
const setIntentLength = require('./setIntentLength');
const setSessionsPerEra = require('./setSessionsPerEra');
const setValidatorCount = require('./setValidatorCount');

module.exports = function staking (db: WrapDbInterface): ChainDb$State$Staking {
  const balance = createBalance(db);

  return {
    getBalance: balance.get,
    setBalance: balance.set,
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
