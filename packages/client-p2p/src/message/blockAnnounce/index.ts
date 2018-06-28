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

const NAME = 'BlockAnnounce';
const TYPE = 3;

function blockAnnounce ({ header = createHeader({}) }: BlockAnnounceMessage): MessageInterface {
  const raw: BlockAnnounceMessage = {
    header
  };

  return base(NAME, TYPE, {
    raw,
    rawDecode: (data: BlockAnnounceEncoded): BlockAnnounceMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockAnnounceEncoded =>
      rawEncode(raw)
  });
}

(blockAnnounce as MessageFactory<any>).name = NAME;
(blockAnnounce as MessageFactory<any>).type = TYPE;

export default (blockAnnounce as MessageFactory<BlockAnnounceMessage>);
