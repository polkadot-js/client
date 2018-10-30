// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Struct } from '@polkadot/types/codec';
import { Header } from '@polkadot/types';

import BaseMessage from './BaseMessage';

class BlockAnnounceMessage extends Struct {
  constructor (value?: any) {
    super({
      header: Header
    }, value);
  }
}

export default class BlockAnnounce extends BaseMessage implements MessageInterface {
  static type = 3;

  constructor (value: any) {
    super(BlockAnnounce.type, new BlockAnnounceMessage(value));
  }

  get header (): Header {
    return this.message.get('header') as Header;
  }
}
