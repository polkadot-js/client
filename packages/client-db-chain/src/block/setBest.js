// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';

const key = require('@polkadot/client-db/key');

const { BEST_HASH, BEST_NUMBER } = require('./prefix');

module.exports = function setBest (db: WrapDbInterface, number: BN | number, hash: Uint8Array): void {
  db.setBn(key(BEST_NUMBER)(), number, 64);
  db.set(key(BEST_HASH)(), hash);
};
