// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '../../types';
import { BlockAnnounceMessage, MessageFactory } from '../types';
import { BlockAnnounceEncoded } from './types';

import createHeader from '@polkadot/primitives/create/header';

import base from '../base';
import rawDecode from './rawDecode';
import rawEncode from './rawEncode';

const TYPE = 3;

function BlockAnnounce ({ header = createHeader({}) }: BlockAnnounceMessage): MessageInterface {
  const raw: BlockAnnounceMessage = {
    header
  };

  return base(BlockAnnounce.name, TYPE, {
    raw,
    rawDecode: (data: BlockAnnounceEncoded): BlockAnnounceMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockAnnounceEncoded =>
      rawEncode(raw)
  });
}

(BlockAnnounce as MessageFactory<any>).type = TYPE;

export default (BlockAnnounce as MessageFactory<BlockAnnounceMessage>);
