// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface, BlockResponseMessage, BlockResponseMessageBlock } from './types';

import u8aConcat from '@polkadot/util/u8a/concat';
import decodeHeaderRaw from '@polkadot/primitives/codec/header/decodeRaw';
import decodeHeader from '@polkadot/primitives/codec/header/decode';
import u8aToBn from '@polkadot/util/u8a/toBn';
import bnToU8a from '@polkadot/util/bn/toU8a';

import BaseMessage from './BaseMessage';
import assert from '@polkadot/util/assert';

const COUNT_OFF = 8;
const BLOCK_OFF = COUNT_OFF + 4;

const I_HDRP_OFF = 32;
const I_HDRD_OFF = I_HDRP_OFF + 1;

export default class BlockResponse extends BaseMessage implements MessageInterface, BlockResponseMessage {
  static type = 2;

  id: number;
  blocks: Array<BlockResponseMessageBlock>;

  constructor ({ blocks, id }: BlockResponseMessage) {
    super(BlockResponse.type);

    this.blocks = blocks;
    this.id = id;
  }

  encode (): Uint8Array {
    return u8aConcat(
      super.encode()
    );
  }

  toJSON (): any {
    return {
      id: this.id
    };
  }

  // NOTE: This assumes that we are getting back everything we requested as specified in BlockRequest
  static decode (u8a: Uint8Array): BlockResponse {
    const id = u8aToBn(u8a.subarray(0, COUNT_OFF), true).toNumber();
    const numBlocks = u8aToBn(u8a.subarray(COUNT_OFF, BLOCK_OFF), true).toNumber();
    const blocks: Array<BlockResponseMessageBlock> = [];
    let offset = BLOCK_OFF;

    for (let i = 0; i < numBlocks; i++) {
      const hash = u8a.slice(offset, offset + I_HDRP_OFF);
      const headerRaw = decodeHeaderRaw(u8a.subarray(offset + I_HDRD_OFF)).header.slice();
      const header = decodeHeader(headerRaw);

      offset += I_HDRD_OFF + headerRaw.length + 1; // skip 00/01

      const numExt = u8aToBn(u8a.subarray(offset, offset + 4), true).toNumber();
      const extrinsics: Array<Uint8Array> = [];

      offset = BlockResponse.decodeExtrinsics(u8a, offset + 4, numExt, extrinsics);
      offset += 3; // skip reciept, queue and justification indicator

      let justification: Uint8Array | null = null;

      if (u8a[offset - 1] === 1) {
        let justLength = 4 + 32; // round length + hash length
        const numSigs = u8aToBn(u8a.subarray(offset + justLength, offset + justLength + 4), true).toNumber();

        justLength += 4 + (numSigs * (32 + 64));

        justification = u8a.subarray(offset, offset + justLength);

        offset += justLength;
      }

      blocks.push({
        hash,
        header,
        encoded: u8aConcat.apply(null, [headerRaw, bnToU8a(numExt, 32, true)].concat(extrinsics)),
        justification
      });
    }

    assert(offset === u8a.length, `Expected to exhaust data, calculated ${offset}, received ${u8a.length}`);

    return new BlockResponse({
      id,
      blocks
    });
  }

  private static decodeExtrinsics (u8a: Uint8Array, offset: number, count: number, extrinsics: Array<Uint8Array>): number {
    for (let j = 0; j < count; j++) {
      const length = u8aToBn(u8a.subarray(offset, offset + 4), true).toNumber();

      extrinsics.push(u8a.slice(offset, offset + 4 + length));

      offset += 4 + length;
    }

    return offset;
  }
}
