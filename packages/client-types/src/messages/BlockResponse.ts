// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Struct, Vector } from '@polkadot/types/codec';
import { u64 as U64 } from '@polkadot/types';

import BlockData from '../BlockData';
import BaseMessage from './BaseMessage';

export class BlockResponseMessage extends Struct {
  constructor (value?: any) {
    super({
      id: U64,
      blocks: Vector.with(BlockData)
    }, value);
  }

  get blocks (): Vector<BlockData> {
    return this.get('blocks') as Vector<BlockData>;
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

  get blocks (): Vector<BlockData> {
    return this.message.get('blocks') as Vector<BlockData>;
  }

  get id (): U64 {
    return this.message.get('id') as U64;
  }
}
