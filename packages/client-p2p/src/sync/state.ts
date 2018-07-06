// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { SyncState } from './types';

export default function state (): SyncState {
  return {
    blockRequests: {},
    blockQueue: {},
    status: 'Idle'
  };
}
