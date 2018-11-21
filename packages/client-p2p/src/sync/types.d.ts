// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { BlockResponseMessage$Block } from '@polkadot/client-types/messages/BlockResponse';
import { PeerInterface, SyncStatus } from '../types';

import { BlockRequest } from '@polkadot/client-types/messages';

export type SyncState$Request = {
  peer: PeerInterface,
  request: BlockRequest,
  timeout: number
}

export type SyncState$BlockRequests = {
  [index: string]: SyncState$Request
};

export type SyncState$BlockQueue = {
  [index: string]: {
    block: BlockResponseMessage$Block,
    peer: PeerInterface
  }
};

export type SyncState = {
  blockRequests: SyncState$BlockRequests,
  blockQueue: SyncState$BlockQueue,
  status: SyncStatus
};

export type SyncInterface$Events = 'imported';

export interface SyncInterface {
  on: (type: SyncInterface$Events, cb: () => any) => any,
}
