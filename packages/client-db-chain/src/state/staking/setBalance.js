// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');

const { BALANCE_OF } = require('./keys');

module.exports = function setBalance (db: WrapDbInterface, publicKey: Uint8Array, value: BN | number): void {
  db.setBn64(BALANCE_OF(publicKey), value);
};
