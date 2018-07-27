// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Header } from '@polkadot/primitives/header';
import { MessageInterface, BlockAnnounceMessage } from './types';

import headerDecode from '@polkadot/primitives/codec/header/decode';
import headerEncode from '@polkadot/primitives/codec/header/encode';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToHex from '@polkadot/util/u8a/toHex';
import bnToHex from '@polkadot/util/bn/toHex';

import BaseMessage from './BaseMessage';

export default class BlockAnnounce extends BaseMessage implements MessageInterface, BlockAnnounceMessage {
  static type = 3;

  header: Header;

  constructor ({ header }: BlockAnnounceMessage) {
    super(BlockAnnounce.type);

    this.header = header;
  }

  encode (): Uint8Array {
    return u8aConcat(
      super.encode(),
      headerEncode(this.header)
    );
  }

  toJSON (): any {
    const { digest, extrinsicsRoot, parentHash, stateRoot } = this.header;

    return {
      number: bnToHex(this.header.number),
      extrinsicsRoot: u8aToHex(extrinsicsRoot),
      parentHash: u8aToHex(parentHash),
      stateRoot: u8aToHex(stateRoot),
      digest
    };
  }

  static decode (u8a: Uint8Array): BlockAnnounce {
    return new BlockAnnounce({
      header: headerDecode(u8a)
    });
  }
}
