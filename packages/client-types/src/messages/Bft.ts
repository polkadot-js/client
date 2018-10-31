// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Struct } from '@polkadot/types/codec';
import { Null } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class BftMessage extends Struct {
  constructor (value?: any) {
    super({
      bft: Null
    }, value);
  }
}

export default class Bft extends BaseMessage implements MessageInterface {
  static type = 5;

  constructor (value: any) {
    super(Bft.type, new BftMessage(value));
  }
}
