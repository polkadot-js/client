// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '../../types';
import { BlockAnnounceMessage } from '../types';
import { BlockAnnounceEncoded } from './types';

import createHeader from '@polkadot/primitives-builder/header';

import base from '../base';
import rawDecode from './rawDecode';
import rawEncode from './rawEncode';

const TYPE: number = 3;

export default function blockAnnounce ({ header = createHeader({}) }: $Shape<BlockAnnounceMessage>): MessageInterface {
  const raw: BlockAnnounceMessage = {
    header
  };

  return base(TYPE, {
    raw,
    rawDecode: (data: BlockAnnounceEncoded): BlockAnnounceMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockAnnounceEncoded =>
      rawEncode(raw)
  });
}
blockAnnounce.TYPE = TYPE;
