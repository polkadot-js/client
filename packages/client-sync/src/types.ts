// Copyright 2017-2019 @polkadot/client-sync authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { PeerInterface } from '@polkadot/client-p2p/types';
import { BlockData } from '@polkadot/client-types';
import { BlockRequest } from '@polkadot/client-types/messages';

export type SyncStatus = 'Idle' | 'Sync';

export type SyncTypes = 'full' | 'light';

export type SyncState$PeerRequest = {
  peer: PeerInterface,
  request: BlockRequest,
  timeout: number
};

export type SyncState$PeerBlock = {
  blockId: string,
  block: BlockData,
  peer: PeerInterface
};

export type SyncState = {
  blockRequests: Map<string, SyncState$PeerRequest>,
  blockQueue: Map<string, SyncState$PeerBlock>,
  status: SyncStatus
};

export type SyncInterface$Events = 'imported';

export interface SyncInterface {
  on: (type: SyncInterface$Events, cb: () => any) => any;
}
