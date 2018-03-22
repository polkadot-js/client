// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');

const { CURRENT_ERA } = require('./keys');

module.exports = function setCurrentEra (db: WrapDbInterface, era: BN | number): void {
  db.setBn64(CURRENT_ERA(), era);
};
