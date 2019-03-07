// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { PeerInterface, SyncStatus } from '../types';

import { BlockData } from '@polkadot/client-types/index';
import { BlockRequest } from '@polkadot/client-types/messages';

export type SyncState$Request = {
  peer: PeerInterface,
  request: BlockRequest,
  timeout: number
};

export type SyncState$BlockRequests = {
  [index: string]: SyncState$Request
};

export type SyncState$PeerBlock = {
  block: BlockData,
  peer: PeerInterface
};

export type SyncState$BlockQueue = {
  [index: string]: SyncState$PeerBlock
};

export type SyncState = {
  blockRequests: SyncState$BlockRequests,
  blockQueue: SyncState$BlockQueue,
  status: SyncStatus
};

export type SyncInterface$Events = 'imported';

export interface SyncInterface {
  on: (type: SyncInterface$Events, cb: () => any) => any;
}
