// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageInterface } from './types';

import { Enum, EnumType, Option, Set, Struct } from '@polkadot/types/codec';
import { BlockNumber, Hash, u32 as U32, u64 as U64 } from '@polkadot/types';
import Null from '@polkadot/types/Null';

import BaseMessage from './BaseMessage';

export class BlockRequestMessage$Fields extends Set {
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

export class BlockRequestMessage$Direction extends Enum {
  constructor (value: any = 'Ascending') {
    super([
      'Ascending',
      'Descending'
    ], value);
  }
}

export class BlockRequestMessage$From extends EnumType<BlockNumber | Hash> {
  constructor (value?: any) {
    super({
      Hash,
      BlockNumber
    }, value, 1);
  }
}

export class BlockRequestMessage$To extends EnumType<Hash | Null> {
  constructor (value?: any) {
    super({
      Null,
      Hash
    }, value, 0);
  }
}

export class BlockRequestMessage extends Struct {
  constructor (value?: any) {
    super({
      id: U64,
      fields: BlockRequestMessage$Fields,
      from: BlockRequestMessage$From,
      to: BlockRequestMessage$To,
      direction: BlockRequestMessage$Direction,
      max: Option.with(U32)
    }, value);
  }
}

export default class BlockRequest extends BaseMessage implements MessageInterface {
  static type = 1;

  constructor (value: any) {
    super(BlockRequest.type, new BlockRequestMessage(value));
  }

  get direction (): BlockRequestMessage$Direction {
    return this.message.get('direction') as BlockRequestMessage$Direction;
  }

  get fields (): BlockRequestMessage$Fields {
    return this.message.get('fields') as BlockRequestMessage$Fields;
  }

  get from (): EnumType<Hash | BlockNumber> {
    return this.message.get('from') as EnumType<Hash | BlockNumber>;
  }

  get id (): U64 {
    return this.message.get('id') as U64;
  }

  get max (): U32 {
    return this.message.get('max') as U32;
  }

  get to (): EnumType<Hash | Null> {
    return this.message.get('to') as EnumType<Hash | Null>;
  }
}
