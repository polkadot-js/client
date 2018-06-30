// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { HeaderHash } from '@polkadot/primitives/base';
import { MessageEncoder, BlockRequestEncoded, BlockRequestMessage, BlockRequestMessageDirection, BlockRequestMessageField } from './types';

import defaults from '@polkadot/client-p2p/defaults';
import hashEncode from '@polkadot/primitives/json/hash/encode';
import isBn from '@polkadot/util/is/bn';
import bnDecode from '@polkadot/primitives/json/bn/decode';
import hashDecode from '@polkadot/primitives/json/hash/decode';
import isString from '@polkadot/util/is/string';

export default class BlockRequest implements MessageEncoder<BlockRequestEncoded>, BlockRequestMessage {
  static type = 3;
  readonly type = BlockRequest.type;

  direction: BlockRequestMessageDirection;
  fields: Array<BlockRequestMessageField>;
  from: HeaderHash | BN;
  id: number;
  max: number;
  // to: HeaderHash | null;

  constructor ({ direction, fields, from, id, max }: BlockRequestMessage) {
    this.direction = direction;
    this.fields = fields;
    this.from = from;
    this.id = id;
    this.max = max || defaults.MAX_SYNC_BLOCKS;
  }

  encode (): BlockRequestEncoded {
    return {
      BlockRequest: {
        direction: this.direction,
        fields: this.fields,
        from: isBn(this.from)
          ? this.from.toNumber() // bnEncode(from, 64)
          : hashEncode(this.from, 256),
        id: this.id,
        max: this.max,
        to: null
      }
    };
  }

  static decode ({ BlockRequest: { direction, fields, from, id, max } }: BlockRequestEncoded): BlockRequest {
    return new BlockRequest({
      direction,
      fields,
      from: isString(from)
        ? hashDecode(from, 256)
        : bnDecode(from.toString(), 64),
      id,
      max
    });
  }
}
