// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const key = require('@polkadot/client-db/key');

const { VALIDATOR_COUNT } = require('./prefix');

module.exports = function setValidatorCount (db: WrapDbInterface, count: BN | number): void {
  db.setBn(key(VALIDATOR_COUNT), count, 64);
};