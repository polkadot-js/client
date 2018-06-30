// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageEncoder, BlockResponseEncoded, BlockResponseMessage, BlockResponseMessageBlock } from './types';

import bnToBn from '@polkadot/util/bn/toBn';
import bnToU8a from '@polkadot/util/bn/toU8a';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToU8a from '@polkadot/util/u8a/toU8a';
import encodeHeader from '@polkadot/primitives/codec/header/encode';
import hashDecode from '@polkadot/primitives/json/hash/decode';

export default class BlockResponse implements MessageEncoder<BlockResponseEncoded>, BlockResponseMessage {
  static type = 2;
  readonly type = BlockResponse.type;

  id: number;
  blocks: Array<BlockResponseMessageBlock>;

  constructor ({ blocks, id }: BlockResponseMessage) {
    this.blocks = blocks;
    this.id = id;
  }

  encode (): BlockResponseEncoded {
    return {
      BlockResponse: {
        id: this.id
        // FIXME we need to provide the actual blocks here
      }
    } as BlockResponseEncoded;
  }

  static decode ({ BlockResponse: { id, blocks } }: BlockResponseEncoded): BlockResponse {
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
