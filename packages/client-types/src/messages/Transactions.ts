// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Struct, Vector } from '@polkadot/types/codec';
import { Bytes } from '@polkadot/types';

import BaseMessage from './BaseMessage';

class TransactionsMessage extends Struct {
  constructor (value?: any) {
    super({
      transactions: Vector.with(Bytes)
    }, value);
  }
}

export default class Transactions extends BaseMessage implements MessageInterface {
  static type = 4;

  constructor (message: TransactionsMessage) {
    super(Transactions.type, message);
  }

  get transactions (): Vector<Bytes> {
    return this.message.get('transactions') as Vector<Bytes>;
  }

  static decode (u8a: Uint8Array): Transactions {
    return new Transactions(
      new TransactionsMessage(u8a)
    );
  }
}
