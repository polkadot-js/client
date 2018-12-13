// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Option, Struct, Vector } from '@polkadot/types/codec';
import { Bytes, Header, Hash } from '@polkadot/types';

export default class BlockData extends Struct {
  constructor (value?: any) {
    super({
      hash: Hash,
      header: Option.with(Header),
      body: Option.with(Vector.with(Bytes)),
      receipt: Option.with(Bytes),
      messageQueue: Option.with(Bytes),
      justification: Option.with(Bytes)
    }, value);
  }

  get body (): Option<Vector<Bytes>> {
    return this.get('body') as Option<Vector<Bytes>>;
  }

  get hash (): Hash {
    return this.get('hash') as Hash;
  }

  get header (): Option<Header> {
    return this.get('header') as Option<Header>;
  }

  get justification (): Option<Bytes> {
    return this.get('justification') as Option<Bytes>;
  }

  get messageQueue (): Option<Bytes> {
    return this.get('messageQueue') as Option<Bytes>;
  }

  get receipt (): Option<Bytes> {
    return this.get('receipt') as Option<Bytes>;
  }
}
