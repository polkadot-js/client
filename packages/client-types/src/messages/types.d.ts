// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface MessageInterface {
  readonly type: number;

  encode (): Uint8Array;
  toJSON (): any;
}

export interface MessageDecoder <C> {
  readonly type: number;

  new (value: any): MessageInterface;
}
