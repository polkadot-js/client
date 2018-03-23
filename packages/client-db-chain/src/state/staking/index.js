// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking } from './types';

const { k32vU, kNv32, kNv64, kUv64 } = require('../../getset');

const keys = require('./keys');

module.exports = function staking (db: WrapDbInterface): ChainDb$State$Staking {
  return {
    balance: kUv64(db, keys.BALANCE_OF),
    currentEra: kNv64(db, keys.CURRENT_ERA),
    intent: k32vU(db, keys.INTENT_WILL),
    intentLength: kNv32(db, keys.INTENT_WILL_LENGTH),
    sessionsPerEra: kNv64(db, keys.SESSIONS_PER_ERA),
    validatorCount: kNv64(db, keys.VALIDATOR_COUNT)
  };
};
