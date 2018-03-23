// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$System$Nonce } from './types';

const { NONCE_OF } = require('./keys');

module.exports = function nonce (db: WrapDbInterface): ChainDb$State$System$Nonce {
  return {
    get: (publicKey: Uint8Array): BN =>
      db.getBn64(NONCE_OF(publicKey))
  };
};
