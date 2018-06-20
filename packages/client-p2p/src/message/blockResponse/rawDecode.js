// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockResponseMessage, BlockResponseMessage$BlockData } from '../types';
import type { BlockResponseEncoded } from './types';

import bytesDecode from '@polkadot/primitives-json/bytes/decode';
import hashDecode from '@polkadot/primitives-json/hash/decode';

export default function rawDecode (raw: BlockResponseMessage, { id, blocks }: BlockResponseEncoded): BlockResponseMessage {
  raw.id = id;
  raw.blocks = blocks.map(({ body, hash, header }) => {
    const result: BlockResponseMessage$BlockData = {
      hash: hashDecode(hash)
    };

    // flowlint-next-line sketchy-null-string:off
    if (body) {
      result.body = bytesDecode(body);
    }

    // flowlint-next-line sketchy-null-string:off
    if (header) {
      result.header = bytesDecode(header);
    }

    return result;
  });

  return raw;
}
