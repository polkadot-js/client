// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../types';
import type { BlockRequestEncoded } from './types';

const bnDecode = require('@polkadot/primitives-json/bn/decode');
const hashDecode = require('@polkadot/primitives-json/hash/decode');

module.exports = function rawDecode (raw: BlockRequestMessage, { direction, fields, from, id, max, to }: BlockRequestEncoded): BlockRequestMessage {
  raw.direction = direction;
  raw.fields = fields;
  raw.from = from.length === 66
    ? hashDecode(from, 256)
    : bnDecode(from, 64);
  raw.id = id;
  raw.max = max;

  return raw;
};
