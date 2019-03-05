// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Enum, EnumType, Option, Set, Struct } from '@polkadot/types/codec';
import { BlockNumber, Hash, Null, u32 as U32, u64 as U64 } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class BlockRequest$Fields extends Set {
  constructor (value: any = ['header', 'body', 'justification']) {
    super({
      header:        0b00000001,
      body:          0b00000010,
      receipt:       0b00000100,
      messageQueue:  0b00001000,
      justification: 0b00010000
    }, value);
  }
}

export class BlockRequest$Direction extends Enum {
  constructor (value: any = 'Ascending') {
    super([
      'Ascending',
      'Descending'
    ], value);
  }

  get isAscending (): boolean {
    return this.toNumber() === 0;
  }
}

export class BlockRequest$From extends EnumType<BlockNumber | Hash> {
  constructor (value?: any) {
    super({
      Hash,
      BlockNumber
    }, value, 1);
  }

  isHash (): boolean {
    return this.index === 0;
  }

  asBlockNumber (): BlockNumber {
    return this.value as BlockNumber;
  }

  asHash (): Hash {
    return this.value as Hash;
  }
}

export class BlockRequest$To extends EnumType<Hash | Null> {
  constructor (value?: any) {
    super({
      Null,
      Hash
    }, value, 0);
  }

  get isNull (): boolean {
    return this.index === 0;
  }

  asHash (): Hash {
    return this.value as Hash;
  }
}

export class BlockRequestMessage extends Struct {
  constructor (value?: any) {
    super({
      id: U64,
      fields: BlockRequest$Fields,
      from: BlockRequest$From,
      to: BlockRequest$To,
      direction: BlockRequest$Direction,
      max: Option.with(U32)
    }, value);
  }
}

export default class BlockRequest extends BaseMessage implements MessageInterface {
  static type = 1;

  constructor (value: any) {
    super(BlockRequest.type, new BlockRequestMessage(value));
  }

  get direction (): BlockRequest$Direction {
    return this.message.get('direction') as BlockRequest$Direction;
  }

  get fields (): BlockRequest$Fields {
    return this.message.get('fields') as BlockRequest$Fields;
  }

  get from (): BlockRequest$From {
    return this.message.get('from') as BlockRequest$From;
  }

  get id (): U64 {
    return this.message.get('id') as U64;
  }

  get max (): Option<U32> {
    return this.message.get('max') as Option<U32>;
  }

  get to (): BlockRequest$To {
    return this.message.get('to') as BlockRequest$To;
  }
}
