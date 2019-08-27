// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Struct } from '@polkadot/types';
import { bnToU8a, u8aConcat } from '@polkadot/util';

export default class BaseMessage {
  public readonly message: Struct;

  public readonly type: number;

  public constructor (type: number, message: Struct) {
    this.message = message;
    this.type = type;
  }

  public encode (): Uint8Array {
    return u8aConcat(
      bnToU8a(this.type, 8, true),
      this.message.toU8a()
    );
  }

  public toJSON (): any {
    return this.message.toJSON();
  }

  public toString (): string {
    return JSON.stringify(this.toJSON());
  }
}
