// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockResponseMessage } from '../types';
import { BlockResponseEncoded, BlockResponseEncoded$BlockData } from './types';

import bytesEncode from '@polkadot/primitives/json/bytes/encode';
import hashEncode from '@polkadot/primitives/json/hash/encode';

export default function rawEncode ({ id, blocks }: BlockResponseMessage): BlockResponseEncoded {
  return {
    id,
    blocks: blocks.map(({ body, hash, header }) => {
      const result: BlockResponseEncoded$BlockData = {
        hash: hashEncode(hash, 256)
      };

      if (body) {
        result.body = bytesEncode(body);
      }

      if (header) {
        result.header = bytesEncode(header);
      }

      return result;
    })
  };
}
