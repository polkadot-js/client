// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BlockNumber, Hash } from '@polkadot/types/interfaces';
import { MessageInterface } from './types';

import { Enum, Option, Set, Struct } from '@polkadot/types/codec';
import { u32, u64 } from '@polkadot/types';

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

export class BlockRequest$From extends Enum {
  constructor (value?: any, index?: number) {
    super({
      Hash: 'Hash',
      BlockNumber: 'BlockNumber'
    }, value, index);
  }

  get isHash (): boolean {
    return this.index === 0;
  }

  asBlockNumber (): BlockNumber {
    return this.value as BlockNumber;
  }

  asHash (): Hash {
    return this.value as Hash;
  }
}

export class BlockRequestMessage extends Struct {
  constructor (value?: any) {
    super({
      id: 'u64',
      fields: BlockRequest$Fields,
      from: BlockRequest$From,
      to: 'Option<Hash>',
      direction: BlockRequest$Direction,
      max: 'Option<u32>'
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

  get id (): u64 {
    return this.message.get('id') as u64;
  }

  get max (): Option<u32> {
    return this.message.get('max') as Option<u32>;
  }

  get to (): Option<Hash> {
    return this.message.get('to') as Option<Hash>;
  }
}
