// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Consensys } from '../../types';

const setAuthority = require('./setAuthority');
const setAuthorityCount = require('./setAuthorityCount');

module.exports = function consensys (db: WrapDbInterface): ChainDb$State$Consensys {
  return {
    setAuthority: (id: BN | number, publicKey: Uint8Array): void =>
      setAuthority(db, id, publicKey),
    setAuthorityCount: (count: BN | number): void =>
      setAuthorityCount(db, count)
  };
};
