// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface, TransactionsMessage } from './types';

import u8aConcat from '@polkadot/util/u8a/concat';

import BaseMessage from './BaseMessage';
import bnToU8a from '@polkadot/util/bn/toU8a';
import u8aToBn from '@polkadot/util/u8a/toBn';
import u8aToHex from '@polkadot/util/u8a/toHex';

export default class Transactions extends BaseMessage implements MessageInterface, TransactionsMessage {
  static type = 4;

  transactions: Array<Uint8Array>;

  constructor (transactions: Array<Uint8Array>) {
    super(Transactions.type);

    this.transactions = transactions;
  }

  encode (): Uint8Array {
    return u8aConcat.apply(
      null,
      [
        super.encode(),
        bnToU8a(this.transactions.length, 32, true)
      ].concat(this.transactions));
  }

  toJSON (): any {
    return {
      transactions: this.transactions.map((transaction) =>
        u8aToHex(transaction)
      )
    };
  }

  static decode (u8a: Uint8Array): Transactions {
    const count = u8aToBn(u8a.subarray(0, 4), true).toNumber();
    const transactions: Array<Uint8Array> = [];
    let offset = 4;

    for (let i = 0; i < count; i++) {
      const length = u8aToBn(u8a.subarray(offset, offset + 4), true).toNumber();

      transactions.push(u8a.subarray(offset, offset + 4 + length));
      offset += 4 + length;
    }

    return new Transactions(transactions);
  }
}
