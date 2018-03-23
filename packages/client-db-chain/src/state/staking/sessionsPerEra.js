// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Staking$SessionsPerEra } from './types';

const { SESSIONS_PER_ERA } = require('./keys');

module.exports = function sessionsPerEra (db: WrapDbInterface): ChainDb$State$Staking$SessionsPerEra {
  return {
    set: (count: BN | number): void =>
      db.setBn64(SESSIONS_PER_ERA(), count)
  };
};
