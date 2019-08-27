// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Header } from '@polkadot/types/interfaces';
import { MessageInterface } from './types';

import { Struct } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class BlockAnnounceMessage extends Struct {
  public constructor (value?: any) {
    super({
      header: 'Header'
    }, value);
  }
}

export default class BlockAnnounce extends BaseMessage implements MessageInterface {
  public static type = 3;

  public constructor (value: any) {
    super(BlockAnnounce.type, new BlockAnnounceMessage(value));
  }

  public get header (): Header {
    return this.message.get('header') as Header;
  }
}
