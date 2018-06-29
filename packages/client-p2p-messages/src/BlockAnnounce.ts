// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Header } from '@polkadot/primitives/header';
import { JsonHeader } from '@polkadot/primitives/json/types';
import { MessageEncoder, BlockAnnounceMessage } from './types';

import headerDecode from '@polkadot/primitives/json/header/decode';
import headerEncode from '@polkadot/primitives/json/header/encode';

type BlockAnnounceEncoded = {
  BlockAnnounce: {
    header: JsonHeader
  }
};

export default class BlockAnnounce implements MessageEncoder<BlockAnnounceEncoded>, BlockAnnounceMessage {
  static type = 3;

  type: number;
  header: Header;

  constructor ({ header }: BlockAnnounceMessage) {
    this.type = BlockAnnounce.type;
    this.header = header;
  }

  encode (): BlockAnnounceEncoded {
    return {
      BlockAnnounce: {
        header: headerEncode(this.header)
      }
    };
  }

  static decode ({ BlockAnnounce: { header } }: BlockAnnounceEncoded): BlockAnnounce {
    return new BlockAnnounce({
      header: headerDecode(header)
    });
  }
}
