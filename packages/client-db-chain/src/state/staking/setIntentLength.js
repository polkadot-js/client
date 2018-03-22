// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const key = require('@polkadot/client-db/key');

const { INTENT_WILL_LENGTH } = require('./prefix');

module.exports = function setIntentLength (db: WrapDbInterface, length: BN | number): void {
  db.setBn(key(INTENT_WILL_LENGTH)(), length, 32);
};
