// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Bytes, Struct, Vec } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class TransactionsMessage extends Struct {
  constructor (value?: any) {
    super({
      transactions: Vec.with(Bytes)
    }, value);
  }
}

export default class Transactions extends BaseMessage implements MessageInterface {
  static type = 4;

  constructor (message: TransactionsMessage) {
    super(Transactions.type, message);
  }

  get transactions (): Vec<Bytes> {
    return this.message.get('transactions') as Vec<Bytes>;
  }

  static decode (u8a: Uint8Array): Transactions {
    return new Transactions(
      new TransactionsMessage(u8a)
    );
  }
}
