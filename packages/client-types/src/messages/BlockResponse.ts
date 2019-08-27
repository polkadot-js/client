// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Struct, Vec, u64 } from '@polkadot/types';

import BlockData from '../BlockData';
import BaseMessage from './BaseMessage';

export class BlockResponseMessage extends Struct {
  public constructor (value?: any) {
    super({
      id: 'u64',
      blocks: Vec.with(BlockData)
    }, value);
  }

  public get blocks (): Vec<BlockData> {
    return this.get('blocks') as Vec<BlockData>;
  }

  public get id (): u64 {
    return this.get('id') as u64;
  }
}

export default class BlockResponse extends BaseMessage implements MessageInterface {
  public static type = 2;

  public constructor (value?: any) {
    super(BlockResponse.type, new BlockResponseMessage(value));
  }

  public get blocks (): Vec<BlockData> {
    return this.message.get('blocks') as Vec<BlockData>;
  }

  public get id (): u64 {
    return this.message.get('id') as u64;
  }
}
