// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import isUndefined from '@polkadot/util/is/undefined';

import BlockAnnounce from './BlockAnnounce';
import BlockRequest from './BlockRequest';
import BlockResponse from './BlockResponse';
import Status from './Status';

export default function decodeMessage (encoded: string) {
  const json: any = JSON.parse(encoded);

  if (!isUndefined(json.BlockAnnounce)) {
    return BlockAnnounce.decode(json);
  }

  if (!isUndefined(json.BlockRequest)) {
    return BlockRequest.decode(json);
  }

  if (!isUndefined(json.BlockResponse)) {
    return BlockResponse.decode(json);
  }

  if (!isUndefined(json.Status)) {
    return Status.decode(json);
  }

  throw new Error(`Unknown message received, ${json}`);
}
