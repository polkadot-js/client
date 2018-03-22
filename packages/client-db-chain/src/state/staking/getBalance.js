// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';

const { BALANCE_OF } = require('./keys');

module.exports = function getBalance (db: WrapDbInterface, publicKey: Uint8Array): BN {
  return db.getBn64(BALANCE_OF(publicKey));
};
