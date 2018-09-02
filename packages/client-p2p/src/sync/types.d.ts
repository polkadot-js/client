// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { BlockResponseMessageBlock } from '@polkadot/client-p2p-messages/types';
import { PeerInterface, SyncStatus } from '../types';

import BlockRequest from '@polkadot/client-p2p-messages/BlockRequest';

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
    block: BlockResponseMessageBlock,
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
