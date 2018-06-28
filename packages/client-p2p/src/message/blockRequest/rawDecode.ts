// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockRequestMessage } from '../types';
import { BlockRequestEncoded } from './types';

import bnDecode from '@polkadot/primitives/json/bn/decode';
import hashDecode from '@polkadot/primitives/json/hash/decode';
import isString from '@polkadot/util/is/string';

export default function rawDecode (raw: BlockRequestMessage, { direction, fields, from, id, max, to }: BlockRequestEncoded): BlockRequestMessage {
  raw.direction = direction;
  raw.fields = fields;
  raw.from = isString(from)
    ? hashDecode(from, 256)
    : bnDecode(from.toString(), 64);
  raw.id = id;
  raw.max = max;

  return raw;
}
