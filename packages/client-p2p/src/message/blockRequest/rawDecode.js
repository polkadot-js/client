// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../types';

const bnDecode = require('@polkadot/primitives-rlp/bn/decode');
const hashDecode = require('@polkadot/primitives-rlp/hash/decode');
const u8aToBn = require('@polkadot/util/u8a/toBn');

const { ATTRIBUTES, DIRECTIONS } = require('./mapping');

module.exports = function rawDecode (raw: BlockRequestMessage, data: Array<*>): BlockRequestMessage {
  const [direction, _fields, from] = data;
  const fields = u8aToBn(_fields).toNumber();

  raw.direction = DIRECTIONS[u8aToBn(direction).toNumber()];
  raw.fields = Object.keys(ATTRIBUTES).reduce((result, attr) => {
    if ((fields & ATTRIBUTES[attr]) === ATTRIBUTES[attr]) {
      result.push(attr);
    }

    return result;
  }, []);
  raw.from = {
    number: bnDecode(from[0], 64),
    hash: hashDecode(from[1], 256)
  };

  return raw;
};
