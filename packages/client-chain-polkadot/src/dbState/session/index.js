// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotStateDb$Session } from '../../types';

const setLength = require('./setLength');
const setValue = require('./setValue');
const setValueCount = require('./setValueCount');

module.exports = function session (db: BaseDbInterface): PolkadotStateDb$Session {
  return {
    setLength: (length: BN | number): void =>
      setLength(db, length),
    setValue: (id: BN | number, publicKey: Uint8Array): void =>
      setValue(db, id, publicKey),
    setValueCount: (count: BN | number): void =>
      setValueCount(db, count)
  };
};
