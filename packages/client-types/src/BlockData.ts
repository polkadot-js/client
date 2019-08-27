// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Header, Hash } from '@polkadot/types/interfaces';
import { Option, Struct, Vec } from '@polkadot/types/codec';
import { Bytes } from '@polkadot/types';

export default class BlockData extends Struct {
  public constructor (value?: any) {
    super({
      hash: 'Hash',
      header: 'Option<Header>',
      body: Option.with('Vec<Bytes>'),
      receipt: 'Option<Bytes>',
      messageQueue: 'Option<Bytes>',
      justification: 'Option<Bytes>'
    }, value);
  }

  public get body (): Vec<Bytes> {
    return (this.get('body') as Option<Vec<Bytes>>).unwrap();
  }

  public get hash (): Hash {
    return this.get('hash') as Hash;
  }

  public get header (): Header {
    return (this.get('header') as Option<Header>).unwrap();
  }

  public get justification (): Option<Bytes> {
    return this.get('justification') as Option<Bytes>;
  }

  public get messageQueue (): Option<Bytes> {
    return this.get('messageQueue') as Option<Bytes>;
  }

  public get receipt (): Option<Bytes> {
    return this.get('receipt') as Option<Bytes>;
  }
}
