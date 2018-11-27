// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Struct } from '@polkadot/types/codec';
import { bnToU8a, u8aConcat } from '@polkadot/util';

export default class BaseMessage {
  readonly message: Struct;
  readonly type: number;

  constructor (type: number, message: Struct) {
    this.message = message;
    this.type = type;
  }

  encode (): Uint8Array {
    return u8aConcat(
      bnToU8a(this.type, 8, true),
      this.message.toU8a()
    );
  }

  toJSON (): any {
    this.message.toJSON();
  }
}
