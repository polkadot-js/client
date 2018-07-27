// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface, BftMessage } from './types';

import u8aConcat from '@polkadot/util/u8a/concat';

import BaseMessage from './BaseMessage';

export default class Bft extends BaseMessage implements MessageInterface, BftMessage {
  static type = 5;

  constructor () {
    super(Bft.type);
  }

  encode (): Uint8Array {
    return u8aConcat(
      super.encode()
    );
  }

  toJSON (): any {
    return {};
  }

  static decode (u8a: Uint8Array): Bft {
    return new Bft();
  }
}
