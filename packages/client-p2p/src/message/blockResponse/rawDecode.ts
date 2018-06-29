// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockResponseMessage, BlockResponseMessage$BlockData } from '../types';
import { BlockResponseEncoded } from './types';

import bnToBn from '@polkadot/util/bn/toBn';
import bnToU8a from '@polkadot/util/bn/toU8a';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToU8a from '@polkadot/util/u8a/toU8a';
import encodeHeader from '@polkadot/primitives/codec/header/encode';
// import bytesDecode from '@polkadot/primitives/json/bytes/decode';
import hashDecode from '@polkadot/primitives/json/hash/decode';

export default function rawDecode (raw: BlockResponseMessage, { id, blocks }: BlockResponseEncoded): BlockResponseMessage {
  raw.id = id;
  raw.blocks = blocks.map(({ body, hash, header }): BlockResponseMessage$BlockData => ({
    hash: hashDecode(hash),
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
    number: bnToBn(header.number)
  }));

  return raw;
}
/*
{
  "BlockResponse":{
    "id":14,
    "blocks":[{
      "hash":"0x2823a7eeb7c163f580b678872cfd2d56fa476d0a19fafdd428aadc60b7df669e",
      "header":{
        "parentHash":"0xa8af1796a43e47ab873a4d0c906c9a3e5cdc3f50631f1f80d90bc6e6ded8102f",
        "number":50,
        "stateRoot":"0x964fc432c6eb19e56eff43be78c988f283f5a082299e07ae837ab07043147f3d","extrinsicsRoot":"0x255567c10ab89a25b0b8324ded9122e64ef40396dd0e6edb29d33331d756ae6a",
        "digest":{"logs":[]}
      },
      "body":[
        [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,109,242,53,91,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ],
      "receipt":null,
      "message_queue":null,
      "justification":{
        "round_number":1,
        "hash":"0x2823a7eeb7c163f580b678872cfd2d56fa476d0a19fafdd428aadc60b7df669e",
        "signatures":[
          [
            [209,114,167,76,218,76,134,89,18,195,43,160,168,10,87,174,105,171,174,65,14,92,203,89,222,232,78,47,68,50,219,79],"0x131b53a8d0b03cbb0dcb9b601b41319fb17c5d06e76fb6525e277a857b83e3fee2b4c9364700f4bba1ce11158a1c8cce3ec46c3882e3f3e7aea4da3f826fab0c"
          ]
        ]
      }
    }]
  }
}
*/
/*
{
  "BlockResponse":{
    "id":1,
    "blocks":[
      {
        "hash":"0xf426e247cdb6553aca1b18ee93dfc7ad36fafc4102abb7483ae0bea8a517825e",
        "header":{
          "parentHash":"0x1be8ed210333702c8521083192eed972d81c10ff7c35d155c09db5f74e651360",
          "number":1,
          "stateRoot":"0xbf994c8df5b3add16035cfb21c67d838392aca877d656e4eae8ed62f025cb7da","extrinsicsRoot":"0xecfbe9aa37f3945d1625549c3cc46f442569b37a638bdae68b3c95de1d8d1ce0",
          "digest":{"logs":[]}
        },
        "body":[
          [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,45,245,52,91,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        "receipt":null,
        "message_queue":null,
        "justification":{
          "round_number":1,
          "hash":"0xf426e247cdb6553aca1b18ee93dfc7ad36fafc4102abb7483ae0bea8a517825e",
          "signatures":[
            [
              [209,114,167,76,218,76,134,89,18,195,43,160,168,10,87,174,105,171,174,65,14,92,203,89,222,232,78,47,68,50,219,79],"0x5d8ec419d93310633e38ea605bad88a32cd8ac23adfad542796f62f9fa83ac9404d407d903a21d5aa317b994f17f7e42360b28b36b9b7c90a41c54375d8c2d0b"
            ]
          ]
        }
      }
    ]
  }
}

{
  "BlockResponse":{
    "id":1,
    "blocks":[
      {
        "hash":"0xf426e247cdb6553aca1b18ee93dfc7ad36fafc4102abb7483ae0bea8a517825e","body":"
        0x
        ff
        0000000000000000000000000000000000000000000000000000000000000000
        00000000
        0300
        2df5345b00000000
        0000000000000000000000000000000000000000000000000000000000000000
        0000000000000000000000000000000000000000000000000000000000000000
        ff
        0000000000000000000000000000000000000000000000000000000000000000
        00000000
        0800
        00000000
        0000000000000000000000000000000000000000000000000000000000000000
        0000000000000000000000000000000000000000000000000000000000000000",
        "header":"
        0x
        1be8ed210333702c8521083192eed972d81c10ff7c35d155c09db5f74e651360
        0100000000000000
        bf994c8df5b3add16035cfb21c67d838392aca877d656e4eae8ed62f025cb7da
        ecfbe9aa37f3945d1625549c3cc46f442569b37a638bdae68b3c95de1d8d1ce0
        00000000"
      }
    ]
  }
}
*/
