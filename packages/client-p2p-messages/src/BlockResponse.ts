// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface, BlockResponseMessage, BlockResponseMessageBlock } from './types';

import bnToBn from '@polkadot/util/bn/toBn';
import bnToU8a from '@polkadot/util/bn/toU8a';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToU8a from '@polkadot/util/u8a/toU8a';
import encodeHeader from '@polkadot/primitives/codec/header/encode';
import hashDecode from '@polkadot/primitives/json/hash/decode';

import BaseMessage from './BaseMessage';

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
    return {};
  }

  static decode (u8a: Uint8Array): BlockResponse {
    return new BlockResponse({
      id,
      blocks: blocks.map(({ body, hash, header, justification }): BlockResponseMessageBlock => ({
        hash: hashDecode(hash),
        header,
        importable: u8aConcat(
          encodeHeader({
            digest: header.digest,
            extrinsicsRoot: u8aToU8a(header.extrinsicsRoot),
            number: bnToBn(header.number),
            parentHash: u8aToU8a(header.parentHash),
            stateRoot: u8aToU8a(header.stateRoot)
          }),
          bnToU8a(body.length, 32, true),
          u8aConcat.apply(null, body.map((tx) =>
            u8aConcat(
              bnToU8a(tx.length, 32, true),
              new Uint8Array(tx)
            )
          ))
        ),
        number: bnToBn(header.number),
        justification
      }))
    });
  }
}
