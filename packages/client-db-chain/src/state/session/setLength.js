// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const key = require('@polkadot/client-db/key');

const { SESSION_LENGTH } = require('./prefix');

module.exports = function setLength (db: WrapDbInterface, length: BN | number): void {
  db.setBn(key(SESSION_LENGTH)(), length, 64);
};
