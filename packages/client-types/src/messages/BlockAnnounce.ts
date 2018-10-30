// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface, BlockAnnounceMessage } from './types';

import { Header } from '@polkadot/types';
import { u8aConcat } from '@polkadot/util';

import BaseMessage from './BaseMessage';

export default class BlockAnnounce extends BaseMessage implements MessageInterface, BlockAnnounceMessage {
  static type = 3;

  header: Header;

  constructor ({ header }: BlockAnnounceMessage) {
    super(BlockAnnounce.type);

    this.header = header;
  }

  encode (): Uint8Array {
    return u8aConcat(
      super.encode(),
      this.header.toU8a()
    );
  }

  toJSON (): any {
    return this.header.toJSON();
  }

  static decode (u8a: Uint8Array): BlockAnnounce {
    return new BlockAnnounce({
      header: new Header(u8a)
    });
  }
}
