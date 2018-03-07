// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../types';
import type { BlockRequestEncoded } from './types';

const bnEncode = require('@polkadot/primitives-json/bn/encode');
const hashEncode = require('@polkadot/primitives-json/hash/encode');

module.exports = function rawEncode ({ direction, fields, from, id, max, to }: BlockRequestMessage): BlockRequestEncoded {
  return {
    direction,
    fields,
    from: {
      hash: hashEncode(from.hash, 256),
      number: bnEncode(from.number, 64)
    },
    id,
    max
  };
};
