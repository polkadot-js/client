// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Struct, Vector } from '@polkadot/types/codec';
import { Bytes, Header, Hash, Signature, u64 as U64 } from '@polkadot/types';

import BaseMessage from './BaseMessage';

class BlockResponseMessage$Block$Justification extends Struct {
  constructor (value?: any) {
    super({
      hash: Hash,
      signature: Signature
    }, value);
  }
}

class BlockResponseMessage$Block extends Struct {
  constructor (value?: any) {
    super({
      hash: Hash,
      header: Header,
      extrinsics: Vector.with(Bytes),
      justification: Vector.with(BlockResponseMessage$Block$Justification)
    }, value);
  }
}

class BlockResponseMessage extends Struct {
  constructor (value?: any) {
    super({
      id: U64,
      blocks: Vector.with(BlockResponseMessage$Block)
    }, value);
  }
}

export default class BlockResponse extends BaseMessage implements MessageInterface {
  static type = 2;

  constructor (value?: any) {
    super(BlockResponse.type, new BlockResponseMessage(value));
  }
}
