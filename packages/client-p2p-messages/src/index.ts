// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageDecoder, MessageInterface } from './types';

import assert from '@polkadot/util/assert';
import isUndefined from '@polkadot/util/is/undefined';

import BlockAnnounce from './BlockAnnounce';
import BlockRequest from './BlockRequest';
import BlockResponse from './BlockResponse';
import Status from './Status';

type DecoderMapping = {
  [index: string]: MessageDecoder<any, any>
};

const decoders: DecoderMapping = {
  BlockAnnounce,
  BlockRequest,
  BlockResponse,
  Status
};

export default function decodeMessage (encoded: string): MessageInterface {
  const json: any = JSON.parse(encoded);
  const [type] = Object.keys(json);
  const Decoder = decoders[type];

  assert(!isUndefined(Decoder), `Unknown message received, ${json}`);

  return Decoder.decode(json);
}
