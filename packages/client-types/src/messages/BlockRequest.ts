// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { MessageInterface } from './types';

import { Enum, EnumType, Option, Set, Struct } from '@polkadot/types/codec';
import { BlockNumber, Hash, u32 as U32, u64 as U64 } from '@polkadot/types';
import Null from '@polkadot/types/Null';
import { bnToU8a, isBn, isNull, u8aConcat, u8aToBn } from '@polkadot/util';

import BaseMessage from './BaseMessage';

class BlockRequestMessage$Fields extends Set {
  constructor (value?: any) {
    super({
      header:        0b00000001,
      body:          0b00000010,
      receipt:       0b00000100,
      messageQueue:  0b00001000,
      justification: 0b00010000
    }, value);
  }
}

// id: u8aToBn(u8a.subarray(0, FIELD_OFF), true).toNumber(),
//       fields: toAttrs(u8a[FIELD_OFF]),
//       from: isBn(from)
//         ? from
//         : new Hash(from),
//       to: to
//         ? new Hash(to)
//         : null,
//       direction,
//       max

class BlockRequestMessage$Direction extends Enum {
  constructor (value?: any) {
    super([
      'Ascending',
      'Descending'
    ], value);
  }
}

class BlockRequestMessage$From extends EnumType<BlockNumber | Hash> {
  constructor (value?: any) {
    super([
      BlockNumber,
      Hash
    ], value);
  }
}

class BlockRequestMessage$To extends EnumType<Hash | Null> {
  constructor (value?: any) {
    super([
      Null,
      Hash
    ], value);
  }
}

class BlockRequestMessage extends Struct {
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

  // FIXME This is a horror, when adding 'justification' flag in here, mplex breaks. Something in the message
  // does not seem to align with the sensibilities of the mplex chunker and it tries to allocate an ungodly
  // large buffer. Not sure how message content can break the message, but it happens.
  //   0x01010000000000000013016c4514000000000000000180000000
  //   vs
  //   0x01010000000000000003016c4514000000000000000180000000
  constructor (
    // { direction = 'Ascending', fields = ['header', 'body', 'justification'], from, id, max, to = null }: BlockRequestMessage) {
      value: any) {
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
