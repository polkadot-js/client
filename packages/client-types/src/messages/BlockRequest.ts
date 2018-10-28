// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { HeaderHash } from '@polkadot/primitives/base';
import { BlockAttr, BlockAttrMap, MessageInterface, BlockRequestMessage, BlockRequestMessageDirection } from './types';

import defaults from '@polkadot/client-p2p/defaults';
import { bnToHex, bnToU8a, isBn, isNull, u8aConcat, u8aToBn, u8aToHex } from '@polkadot/util';

import BaseMessage from './BaseMessage';

const allAttrs: BlockAttrMap = {
  header:        0b00000001,
  body:          0b00000010,
  receipt:       0b00000100,
  messageQueue:  0b00001000,
  justification: 0b00010000
};

const FIELD_OFF = 8;
const FROM_OFF = FIELD_OFF + 1;
const FROM_DATA = FROM_OFF + 1;

function fromAttrs (attrs: Array<BlockAttr>): number {
  return attrs.reduce((result, attr) => {
    return result | allAttrs[attr];
  }, 0);
}

function toAttrs (encoded: number): Array<BlockAttr> {
  return Object
    .keys(allAttrs)
    .map((key) =>
      key as BlockAttr
    )
    .filter((attr) =>
      (encoded & allAttrs[attr]) === allAttrs[attr]
    );
}

export default class BlockRequest extends BaseMessage implements MessageInterface, BlockRequestMessage {
  static type = 1;

  direction: BlockRequestMessageDirection;
  fields: Array<BlockAttr>;
  from: HeaderHash | BN;
  id: number;
  max: number;
  to: HeaderHash | null;

  // FIXME This is a horror, when adding 'justification' flag in here, mplex breaks. Something in the message
  // does not seem to align with the sensibilities of the mplex chunker and it tries to allocate an ungodly
  // large buffer. Not sure how message content can break the message, but it happens.
  //   0x01010000000000000013016c4514000000000000000180000000
  //   vs
  //   0x01010000000000000003016c4514000000000000000180000000
  constructor ({ direction = 'Ascending', fields = ['header', 'body', 'justification'], from, id, max, to = null }: BlockRequestMessage) {
    super(BlockRequest.type);

    this.direction = direction;
    this.fields = fields;
    this.from = from;
    this.id = id;
    this.max = max || defaults.MAX_REQUEST_BLOCKS;
    this.to = to;
  }

  encode (): Uint8Array {
    const from = isBn(this.from)
      ? bnToU8a(this.from, 64, true)
      : this.from;
    const to = isNull(this.to)
      ? new Uint8Array([0])
      : u8aConcat(
        new Uint8Array([1]),
        this.to
      );

    return u8aConcat(
      super.encode(),
      bnToU8a(this.id, 64, true),
      bnToU8a(fromAttrs(this.fields), 8, true),
      new Uint8Array(isBn(this.from) ? [1] : [0]),
      from,
      to,
      new Uint8Array(this.direction === 'Ascending' ? [0] : [1]),
      new Uint8Array([1]),
      bnToU8a(this.max, 32, true)
    );
  }

  toJSON (): any {
    return {
      id: this.id,
      direction: this.direction,
      from: isBn(this.from)
        ? bnToHex(this.from)
        : u8aToHex(this.from),
      max: this.max
    };
  }

  static decode (u8a: Uint8Array): BlockRequest {
    const fromLength = u8a[FROM_OFF] === 0 ? 16 : 32;
    const fromTo = u8a[FROM_DATA + fromLength] === 0 ? 0 : 32;
    const atDirection = FROM_DATA + fromLength + fromTo;
    const maxOff = atDirection + 1;
    const from = fromLength === 16
      ? u8aToBn(u8a.subarray(FROM_DATA, FROM_DATA + fromLength), true)
      : u8a.slice(FROM_DATA, FROM_DATA + fromLength);
    const to = fromTo === 0
      ? null
      : u8a.slice(FROM_DATA + fromLength, atDirection);
    const direction = u8a[atDirection] === 0 ? 'Ascending' : 'Descending';
    const max = u8a[maxOff] === 1
      ? u8aToBn(u8a.subarray(maxOff + 1, maxOff + 1 + 32), true).toNumber()
      : null;

    return new BlockRequest({
      id: u8aToBn(u8a.subarray(0, FIELD_OFF), true).toNumber(),
      fields: toAttrs(u8a[FIELD_OFF]),
      from,
      to,
      direction,
      max
    });
  }
}
