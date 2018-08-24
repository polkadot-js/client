// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { HeaderHash } from '@polkadot/primitives/base';
import { BlockAttr, MessageInterface, BlockRequestMessage, BlockRequestMessageDirection } from './types';

import defaults from '@polkadot/client-p2p/defaults';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToBn from '@polkadot/util/u8a/toBn';
import bnToU8a from '@polkadot/util/bn/toU8a';
import isBn from '@polkadot/util/is/bn';
import isNull from '@polkadot/util/is/null';
import bnToHex from '@polkadot/util/bn/toHex';
import u8aToHex from '@polkadot/util/u8a/toHex';

import fromAttrs from './attrs/fromAttrs';
import toAttrs from './attrs/toAttrs';
import BaseMessage from './BaseMessage';

const FIELD_OFF = 8;
const FROM_OFF = FIELD_OFF + 1;
const FROM_DATA = FROM_OFF + 1;

export default class BlockRequest extends BaseMessage implements MessageInterface, BlockRequestMessage {
  static type = 1;

  direction: BlockRequestMessageDirection;
  fields: Array<BlockAttr>;
  from: HeaderHash | BN;
  id: number;
  max: number;
  to: HeaderHash | null;

  // TODO: Re-add 'justification' in here, with proper decoding in BlockResponse
  constructor ({ direction = 'Ascending', fields = ['header', 'body'], from, id, max, to = null }: BlockRequestMessage) {
    super(BlockRequest.type);

    this.direction = direction;
    this.fields = fields;
    this.from = from;
    this.id = id;
    this.max = max || defaults.MAX_SYNC_BLOCKS;
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

    return new BlockRequest({
      id: u8aToBn(u8a.subarray(0, FIELD_OFF), true).toNumber(),
      fields: toAttrs(u8a[FIELD_OFF]),
      from: fromLength === 16
        ? u8aToBn(u8a.subarray(FROM_DATA, FROM_DATA + fromLength), true)
        : u8a.slice(FROM_DATA, FROM_DATA + fromLength),
      to: fromTo === 0
        ? null
        : u8a.slice(FROM_DATA + fromLength, atDirection),
      direction: u8a[atDirection] === 0 ? 'Ascending' : 'Descending',
      max: u8a[maxOff] === 1
        ? u8aToBn(u8a.subarray(maxOff + 1, maxOff + 1 + 32), true).toNumber()
        : null
    });
  }
}
