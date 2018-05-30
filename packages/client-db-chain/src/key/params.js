// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Param, Params } from '@polkadot/params/types';
import type { Storage$Key$Values } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');
const u8aToU8a = require('@polkadot/util/u8a/toU8a');
const u8aFromString = require('@polkadot/util/u8a/fromString');
const addressDecode = require('@polkadot/util-keyring/address/decode');

module.exports = function formatParams (params: Params, values?: Storage$Key$Values = []): Array<Uint8Array> {
  // $FlowFixMe yeap, values give Array<Param>
  const paramTypes = Object.values(params).map(({ type }: Param) => type);

  // flowlint-next-line unclear-type:off
  return values.map((value: any, index: number): Uint8Array => {
    try {
      if (Array.isArray(paramTypes[index])) {
        throw new Error('Unable to handle Array type');
      }

      const type = paramTypes[index];

      switch (type) {
        case 'AccountId':
          return addressDecode((value: Uint8Array));

        case 'Balance':
        case 'u128':
          return bnToU8a((value: BN), 128, true);

        case 'BlockNumber':
        case 'u64':
          return bnToU8a((value: BN), 64, true);

        case 'bool':
          return new Uint8Array([value ? 1 : 0]);

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
          return u8aToU8a((value: Uint8Array));

        case 'Index':
        case 'PropIndex':
        case 'ReferendumIndex':
        case 'SessionKey':
        case 'VoteIndex':
        case 'VoteThreshold':
        case 'u32':
          return bnToU8a((value: BN), 32, true);

        case 'String':
          return u8aFromString((value: string));

        case 'Timestamp':
          return bnToU8a((value: Date).getTime(), 64, true);

        default:
          (type: empty); // eslint-disable-line
          throw new Error('Unable to find handler');
      }
    } catch (error) {
      console.error('formatParams', value, index, paramTypes[index], error);

      throw error;
    }
  });
};
