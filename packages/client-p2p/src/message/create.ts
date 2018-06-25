// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageFactory } from './types';
import { MessageInterface } from '../types';

import assert from '@polkadot/util/assert';
import isUndefined from '@polkadot/util/is/undefined';

import blockAnnounce from './blockAnnounce';
import blockRequest from './blockRequest';
import blockResponse from './blockResponse';
import status from './status';

type CreateMap = {
  [index: number]: MessageFactory<any>
};

const creators = [
  blockAnnounce, blockRequest, blockResponse, status
].reduce((creators, message) => {
  creators[message.TYPE] = message;

  return creators;
}, {} as CreateMap);

export default function create (id: number, data: any = {}): MessageInterface {
  const creator = creators[id];

  assert(!isUndefined(creator), `No message found for id '${id}'`);

  return creator(data);
}
