// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BlockNumber, Hash } from '@polkadot/types/interfaces';
import { MessageInterface } from './types';

import { Enum, Option, Set, Struct } from '@polkadot/types/codec';
import { u32, u64 } from '@polkadot/types';

import BaseMessage from './BaseMessage';

export class BlockRequestFields extends Set {
  public constructor (value: any = ['header', 'body', 'justification']) {
    super({
      header: 0b00000001,
      body: 0b00000010,
      receipt: 0b00000100,
      messageQueue: 0b00001000,
      justification: 0b00010000
    }, value);
  }
}

export class BlockRequestDirection extends Enum {
  public constructor (value: any = 'Ascending') {
    super([
      'Ascending',
      'Descending'
    ], value);
  }

  public get isAscending (): boolean {
    return this.toNumber() === 0;
  }
}

export class BlockRequestFrom extends Enum {
  public constructor (value?: any, index?: number) {
    super({
      Hash: 'Hash',
      BlockNumber: 'BlockNumber'
    }, value, index);
  }

  public get isHash (): boolean {
    return this.index === 0;
  }

  public asBlockNumber (): BlockNumber {
    return this.value as BlockNumber;
  }

  public asHash (): Hash {
    return this.value as Hash;
  }
}

export class BlockRequestMessage extends Struct {
  public constructor (value?: any) {
    super({
      id: 'u64',
      fields: BlockRequestFields,
      from: BlockRequestFrom,
      to: 'Option<Hash>',
      direction: BlockRequestDirection,
      max: 'Option<u32>'
    }, value);
  }
}

export default class BlockRequest extends BaseMessage implements MessageInterface {
  public static type = 1;

  public constructor (value: any) {
    super(BlockRequest.type, new BlockRequestMessage(value));
  }

  public get direction (): BlockRequestDirection {
    return this.message.get('direction') as BlockRequestDirection;
  }

  public get fields (): BlockRequestFields {
    return this.message.get('fields') as BlockRequestFields;
  }

  public get from (): BlockRequestFrom {
    return this.message.get('from') as BlockRequestFrom;
  }

  public get id (): u64 {
    return this.message.get('id') as u64;
  }

  public get max (): Option<u32> {
    return this.message.get('max') as Option<u32>;
  }

  public get to (): Option<Hash> {
    return this.message.get('to') as Option<Hash>;
  }
}
