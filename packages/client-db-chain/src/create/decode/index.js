// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Param$Type } from '@polkadot/params/types';
import type { StorageMethod, WrapDb } from '../../types';
import type { Creator } from '../types';

const decodeAccount = require('./account');
const decodeBn = require('./bn');
const decodeU8a = require('./u8a');

module.exports = function decode (type: Param$Type, createKey: Creator, db: WrapDb): StorageMethod<BN> | StorageMethod<Uint8Array> {
  switch (type) {
    case 'AccountId':
      return decodeAccount(createKey, db);

    case 'bool':
    case 'Bytes':
    case 'Call':
    case 'Code':
    case 'Digest':
    case 'Hash':
    case 'Header':
    case 'KeyValue':
    case 'KeyValueStorage':
    case 'MisbehaviorReport':
    case 'Proposal':
    case 'Signature':
    case 'String':
    case 'VoteThreshold':
      return decodeU8a(createKey, db);

    case 'Balance':
    case 'u128':
      return decodeBn(createKey, db, 128);

    case 'BlockNumber':
    case 'SessionKey':
    case 'Timestamp':
    case 'u64':
      return decodeBn(createKey, db, 64);

    case 'Index':
    case 'PropIndex':
    case 'ReferendumIndex':
    case 'u32':
    case 'VoteIndex':
      return decodeBn(createKey, db, 32);

    default:
      // NOTE for @flow, if it fails here, we know what is missing
      (type: empty); // eslint-disable-line no-unused-expressions
      throw new Error(`Unable to find storage handler for type ${type}`);
  }
};
