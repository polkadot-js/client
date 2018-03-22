// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$System } from '../../types';

const createBlockHash = require('./blockHash');
const createCode = require('./code');
const getNonce = require('./getNonce');

module.exports = function system (db: WrapDbInterface): ChainDb$State$System {
  const blockHash = createBlockHash(db);
  const code = createCode(db);

  return {
    getBlockHash: blockHash.get,
    getCode: code.get,
    getNonce: (publicKey: Uint8Array): BN =>
      getNonce(db, publicKey),
    setBlockHash: blockHash.set,
    setCode: code.set
  };
};
