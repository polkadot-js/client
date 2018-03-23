// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking } from './types';

const balance = require('./balance');
const currentEra = require('./currentEra');
const intent = require('./intent');
const intentLength = require('./intentLength');
const sessionsPerEra = require('./sessionsPerEra');
const validatorCount = require('./validatorCount');

module.exports = function staking (db: WrapDbInterface): ChainDb$State$Staking {
  return {
    balance: balance(db),
    currentEra: currentEra(db),
    intent: intent(db),
    intentLength: intentLength(db),
    sessionsPerEra: sessionsPerEra(db),
    validatorCount: validatorCount(db)
  };
};
