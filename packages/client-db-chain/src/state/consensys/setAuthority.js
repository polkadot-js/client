// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const key = require('@polkadot/client-db/key');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const { AUTHORITY } = require('./prefix');

module.exports = function setAuthority (db: WrapDbInterface, id: BN | number, publicKey: Uint8Array, isHashed: boolean = false): void {
  db.set(
    key(AUTHORITY, bnToU8a(id, 32, true), isHashed),
    publicKey
  );
};
