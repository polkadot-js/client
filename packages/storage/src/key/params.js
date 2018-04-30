// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { StorageDef$Key$Value, StorageDef$Key$Values, StorageDef$Key$Params } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');
const u8aToU8a = require('@polkadot/util/u8a/toU8a');

module.exports = function formatParams (params: StorageDef$Key$Params, values?: StorageDef$Key$Values = []): Array<Uint8Array> {
  const paramTypes = Object.values(params);

  return values.map((value: StorageDef$Key$Value, index: number): Uint8Array => {
    switch (paramTypes[index]) {
      case 'BlockNumber':
      case 'u64':
        // flowlint-next-line unclear-type:off
        return bnToU8a(((value: any): BN), 64, true);

      case 'u32':
        // flowlint-next-line unclear-type:off
        return bnToU8a(((value: any): BN), 32, true);

      default:
        // flowlint-next-line unclear-type:off
        return u8aToU8a(((value: any): Uint8Array));
    }
  });
};
