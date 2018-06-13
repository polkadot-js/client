// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BlockRequestMessage } from '../types';
import type { BlockRequestEncoded } from './types';

const bnEncode = require('@polkadot/primitives-json/bn/encode');
const hashEncode = require('@polkadot/primitives-json/hash/encode');
const isBn = require('@polkadot/util/is/bn');

module.exports = function rawEncode ({ direction, fields, from, id, max, to }: BlockRequestMessage): BlockRequestEncoded {
  return {
    direction,
    fields,
    from: isBn(from)
      // flowlint-next-line unclear-type:off
      ? bnEncode(((from: any): BN), 64)
      // flowlint-next-line unclear-type:off
      : hashEncode(((from: any): Uint8Array), 256),
    id,
    max
  };
};
