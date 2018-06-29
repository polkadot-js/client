// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockRequestMessageField, BlockResponseMessageBlock } from '@polkadot/client-p2p-messages/types';
import { P2pState } from '../types';

import decodeBlock from '@polkadot/primitives/codec/block/decodeRaw';

export default function getBlockData (self: P2pState, fields: Array<BlockRequestMessageField>, hash: Uint8Array): BlockResponseMessageBlock {
  const { body, header } = decodeBlock(
    self.chain.blocks.block.get(hash)
  );
  const data: BlockResponseMessageBlock = {
    // hash
  } as BlockResponseMessageBlock;

  // if (fields.includes('Body')) {
  //   data.body = body;
  // }

  // if (fields.includes('Header')) {
  //   data.header = header;
  // }

  return data;
}
