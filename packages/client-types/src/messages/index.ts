// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageDecoder, MessageInterface } from './types';

import { assert, isUndefined, u8aToHex } from '@polkadot/util';

import Bft from './Bft';
import BlockAnnounce from './BlockAnnounce';
import BlockRequest from './BlockRequest';
import BlockResponse from './BlockResponse';
import Status from './Status';
import Transactions from './Transactions';

type DecoderMapping = Record<number, MessageDecoder<any>>;

const decoders: DecoderMapping = {
  [Bft.type]: Bft,
  [BlockAnnounce.type]: BlockAnnounce,
  [BlockRequest.type]: BlockRequest,
  [BlockResponse.type]: BlockResponse,
  [Status.type]: Status,
  [Transactions.type]: Transactions
};

export default function decodeMessage (encoded: Uint8Array): MessageInterface {
  const id = encoded[0];
  const Decoder = decoders[id];

  assert(!isUndefined(Decoder), `Unknown message received, id=${id}, ${u8aToHex(encoded)}`);

  // FIXME This should be an EnumType (No need to manually carry type id around)
  return new Decoder(encoded.subarray(1));
}

export {
  Bft,
  BlockAnnounce,
  BlockRequest,
  BlockResponse,
  Status,
  Transactions
};
