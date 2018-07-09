// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Handler } from './types';

import blockAnnounce from './blockAnnounce';
import blockRequest from './blockRequest';
import blockResponse from './blockResponse';
import status from './status';

const handlers: Array<Handler> = [
  blockAnnounce, blockRequest, blockResponse, status
];

export default handlers;
