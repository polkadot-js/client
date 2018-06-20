// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';

import assert from '@polkadot/util/assert';
import isUndefined from '@polkadot/util/is/undefined';

import blockAnnounce from './blockAnnounce';
import blockRequest from './blockRequest';
import blockResponse from './blockResponse';
import status from './status';

type Create = {
  // flowlint-next-line unclear-type:off
  (any): MessageInterface,
  TYPE: number
};

const CREATORS: Array<Create> = [
  blockAnnounce, blockRequest, blockResponse, status
];

// flowlint-next-line unclear-type: off
export default function create (id: number, data?: any = {}): MessageInterface {
  const creator = CREATORS.find((c) => c.TYPE === id);

  assert(!isUndefined(creator), `No message found for id '${id}'`);

  // $FlowFixMe undefined check with assert
  return creator(data);
}
