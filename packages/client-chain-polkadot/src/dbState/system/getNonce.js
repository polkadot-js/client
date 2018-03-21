// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';

const key = require('@polkadot/client-db/key');

const { NONCE_OF } = require('./prefix');

module.exports = function getNonce (db: WrapDbInterface, publicKey: Uint8Array): BN {
  return db.getBn(key(NONCE_OF, publicKey), 64);
};
