// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking$IntentLength } from './types';

const { INTENT_WILL_LENGTH } = require('./keys');

module.exports = function setIntentLength (db: WrapDbInterface): ChainDb$State$Staking$IntentLength {
  return {
    get: (): BN =>
      db.getBn32(INTENT_WILL_LENGTH()),
    set: (length: BN | number): void =>
      db.setBn32(INTENT_WILL_LENGTH(), length)
  };
};
