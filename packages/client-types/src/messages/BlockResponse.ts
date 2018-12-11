// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Option, Struct, Vector } from '@polkadot/types/codec';
import { Bytes, Header, Hash, Justification, u64 as U64 } from '@polkadot/types';

import BaseMessage from './BaseMessage';
import { u8aConcat } from '@polkadot/util';

export class BlockResponseMessage$Data extends Struct {
  constructor (value?: any) {
    super({
      hash: Hash,
      header: Option.with(Header),
      extrinsics: Option.with(Vector.with(Bytes)),
      receipt: Option.with(Bytes),
      messageQueue: Option.with(Bytes),
      justification: Vector.with(Justification)
    }, value);
  }

  get importable (): Uint8Array {
    return u8aConcat(
      this.header.toU8a(),
      this.extrinsics.toU8a()
    );
  }

  get extrinsics (): Vector<Bytes> {
    return (this.get('extrinsics') as Option<Vector<Bytes>>).unwrap();
  }

  get hash (): Hash {
    return this.get('hash') as Hash;
  }

  get header (): Header {
    return (this.get('header') as Option<Header>).unwrap();
  }

  get justification (): Vector<Justification> {
    return (this.get('justification') as Option<Vector<Justification>>).unwrap();
  }

  get messageQueue (): Vector<Bytes> {
    return (this.get('messageQueue') as Option<Vector<Bytes>>).unwrap();
  }

  get receipt (): Vector<Bytes> {
    return (this.get('receipt') as Option<Vector<Bytes>>).unwrap();
  }
}

export class BlockResponseMessage extends Struct {
  constructor (value?: any) {
    super({
      id: U64,
      blocks: Vector.with(BlockResponseMessage$Data)
    }, value);
  }

  get blocks (): Vector<BlockResponseMessage$Data> {
    return this.get('blocks') as Vector<BlockResponseMessage$Data>;
  }

  get id (): U64 {
    return this.get('id') as U64;
  }
}

export default class BlockResponse extends BaseMessage implements MessageInterface {
  static type = 2;

  constructor (value?: any) {
    console.error('BlockResponse');
    super(BlockResponse.type, new BlockResponseMessage(value));
  }

  get blocks (): Vector<BlockResponseMessage$Data> {
    return this.message.get('blocks') as Vector<BlockResponseMessage$Data>;
  }

  get id (): U64 {
    return this.message.get('id') as U64;
  }
}
