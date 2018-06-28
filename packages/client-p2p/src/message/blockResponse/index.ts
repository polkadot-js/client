// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '../../types';
import { BlockResponseMessage, MessageFactory } from '../types';
import { BlockResponseEncoded } from './types';

import base from '../base';
import rawDecode from './rawDecode';
import rawEncode from './rawEncode';

const TYPE = 2;

function BlockResponse ({ blocks = [], id = 0 }: BlockResponseMessage): MessageInterface {
  const raw: BlockResponseMessage = {
    blocks,
    id
  };

  return base(BlockResponse.name, TYPE, {
    raw,
    rawDecode: (data: BlockResponseEncoded): BlockResponseMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockResponseEncoded =>
      rawEncode(raw)
  });
}

(BlockResponse as MessageFactory<any>).type = TYPE;

export default (BlockResponse as MessageFactory<BlockResponseMessage>);
