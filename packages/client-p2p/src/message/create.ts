// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '../types';

import assert from '@polkadot/util/assert';
import isUndefined from '@polkadot/util/is/undefined';

import blockAnnounce from './blockAnnounce';
import blockRequest from './blockRequest';
import blockResponse from './blockResponse';
import status from './status';

type Create = {
  (any): MessageInterface,
  TYPE: number
};

const CREATORS: Array<Create> = [
  blockAnnounce, blockRequest, blockResponse, status
];

export default function create (id: number, data?: any = {}): MessageInterface {
  const creator = CREATORS.find((c) => c.TYPE === id);

  assert(!isUndefined(creator), `No message found for id '${id}'`);

  return creator(data);
}
