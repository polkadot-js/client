// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';

const u8aToBn = require('@polkadot/util/u8a/toBn');

const key = require('../key');
const { NONCE_OF } = require('./prefix');

module.exports = function getNonce (db: BaseDbInterface, publicKey: Uint8Array): BN {
  return u8aToBn(
    db.get(key(NONCE_OF, publicKey)),
    true
  );
};
