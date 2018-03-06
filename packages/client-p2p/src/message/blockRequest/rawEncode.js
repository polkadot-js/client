// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../types';

const bnEncode = require('@polkadot/primitives-rlp/bn/encode');
const hashEncode = require('@polkadot/primitives-rlp/hash/encode');
const numberToU8a = require('@polkadot/util/number/toU8a');

const { ATTRIBUTES, DIRECTIONS } = require('./mapping');

module.exports = function rawEncode ({ direction, fields, from }: BlockRequestMessage): Array<*> {
  return [
    numberToU8a(
      DIRECTIONS.indexOf(direction)
    ),
    numberToU8a(
      fields.reduce((result, attr) => result | ATTRIBUTES[attr], 0)
    ),
    [
      bnEncode(from.number, 64),
      hashEncode(from.hash, 256)
    ]
  ];
};
