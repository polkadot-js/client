// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Consensys } from './types';

const { k32vU, kNv32 } = require('../../getset');

const keys = require('./keys');

module.exports = function consensys (db: WrapDbInterface): ChainDb$State$Consensys {
  const authorityH = k32vU(db, keys.AUTHORITY_H);
  const authorityU = k32vU(db, keys.AUTHORITY_U);

  return {
    authority: {
      get: authorityH.get,
      set: (id: BN | number, publicKey: Uint8Array): void => {
        authorityH.set(id, publicKey);
        authorityU.set(id, publicKey);
      }
    },
    authorityCount: kNv32(db, keys.AUTHORITY_LENGTH)
  };
};
