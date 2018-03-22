// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const { AUTHORITY_H, AUTHORITY_U } = require('./keys');

module.exports = function setAuthority (db: WrapDbInterface, id: BN | number, publicKey: Uint8Array): void {
  const key = bnToU8a(id, 32, true);

  db.set(AUTHORITY_H(key), publicKey);
  db.set(AUTHORITY_U(key), publicKey);
};
