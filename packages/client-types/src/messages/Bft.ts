// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Null, Struct } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class BftMessage extends Struct {
  public constructor (value?: any) {
    super({
      bft: Null
    }, value);
  }
}

export default class Bft extends BaseMessage implements MessageInterface {
  public static type = 5;

  public constructor (value: any) {
    super(Bft.type, new BftMessage(value));
  }
}
