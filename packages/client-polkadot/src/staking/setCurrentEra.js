// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const key = require('../key');
const { CURRENT_ERA } = require('./prefix');

module.exports = function setCurrentEra (db: BaseDbInterface, era: BN | number): void {
  db.set(
    key(CURRENT_ERA),
    bnToU8a(era, 64, true)
  );
};
