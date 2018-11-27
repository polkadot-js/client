// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Struct, Vector } from '@polkadot/types/codec';
import { Bytes, Header, Hash, Signature, u64 as U64 } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class BlockResponseMessage$Block$Justification extends Struct {
  constructor (value?: any) {
    super({
      hash: Hash,
      signature: Signature
    }, value);
  }

  get hash (): Hash {
    return this.get('hash') as Hash;
  }

  get signature (): Signature {
    return this.get('signature') as Signature;
  }
}

export class BlockResponseMessage$Block extends Struct {
  constructor (value?: any) {
    super({
      hash: Hash,
      header: Header,
      extrinsics: Vector.with(Bytes),
      justification: Vector.with(BlockResponseMessage$Block$Justification)
    }, value);
  }

  get extrinsics (): Vector<Bytes> {
    return this.get('extrinsics') as Vector<Bytes>;
  }

  get hash (): Hash {
    return this.get('hash') as Hash;
  }

  get header (): Header {
    return this.get('header') as Header;
  }

  get justification (): Vector<BlockResponseMessage$Block$Justification> {
    return this.get('justification') as Vector<BlockResponseMessage$Block$Justification>;
  }
}

export class BlockResponseMessage extends Struct {
  constructor (value?: any) {
    super({
      id: U64,
      blocks: Vector.with(BlockResponseMessage$Block)
    }, value);
  }

  get blocks (): Vector<BlockResponseMessage$Block> {
    return this.get('blocks') as Vector<BlockResponseMessage$Block>;
  }

  get id (): U64 {
    return this.get('id') as U64;
  }
}

export default class BlockResponse extends BaseMessage implements MessageInterface {
  static type = 2;

  constructor (value?: any) {
    super(BlockResponse.type, new BlockResponseMessage(value));
  }

  get blocks (): Vector<BlockResponseMessage$Block> {
    return this.message.get('blocks') as Vector<BlockResponseMessage$Block>;
  }

  get id (): U64 {
    return this.message.get('id') as U64;
  }
}
