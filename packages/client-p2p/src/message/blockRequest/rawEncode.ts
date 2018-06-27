// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockRequestMessage } from '../types';
import { BlockRequestEncoded } from './types';

import bnEncode from '@polkadot/primitives/json/bn/encode';
import hashEncode from '@polkadot/primitives/json/hash/encode';
import isBn from '@polkadot/util/is/bn';

export default function rawEncode ({ direction, fields, from, id, max, to }: BlockRequestMessage): BlockRequestEncoded {
  return {
    direction,
    fields,
    from: isBn(from)
      ? bnEncode(from, 64)
      : hashEncode((from), 256),
    id,
    max
  };
}
