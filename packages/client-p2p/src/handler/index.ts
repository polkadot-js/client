// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Handler } from './types';

import bft from './bft';
import blockAnnounce from './blockAnnounce';
import blockRequest from './blockRequest';
import blockResponse from './blockResponse';
import status from './status';
import transactions from './transactions';

const handlers: Array<Handler> = [
  bft, blockAnnounce, blockRequest, blockResponse, status, transactions
];

export default handlers;
