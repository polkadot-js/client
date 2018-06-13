// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockResponseMessage } from '../types';
import type { BlockResponseEncoded, BlockResponseEncoded$BlockData } from './types';

const bytesEncode = require('@polkadot/primitives-json/bytes/encode');
const hashEncode = require('@polkadot/primitives-json/hash/encode');

module.exports = function rawEncode ({ id, blocks }: BlockResponseMessage): BlockResponseEncoded {
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
};
