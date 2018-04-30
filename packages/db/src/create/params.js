// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { State$Key$ParamType, State$Key$Type } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');
const u8aToU8a = require('@polkadot/util/u8a/toU8a');

module.exports = function formatParams (values?: Array<State$Key$ParamType> = [], types?: Array<State$Key$Type> = []): Array<Uint8Array> {
  return values.map((value: State$Key$ParamType, index: number): Uint8Array => {
    switch (types[index]) {
      case 'u32':
      case 'u64':
        // flowlint-next-line unclear-type:off
        return bnToU8a(((value: any): BN));

      default:
        // flowlint-next-line unclear-type:off
        return u8aToU8a(((value: any): Uint8Array));
    }
  });
};
