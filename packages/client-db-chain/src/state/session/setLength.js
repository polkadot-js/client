// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');

const { SESSION_LENGTH } = require('./keys');

module.exports = function setLength (db: WrapDbInterface, length: BN | number): void {
  db.setBn64(SESSION_LENGTH(), length);
};
