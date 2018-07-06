// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { SyncStatus } from '@polkadot/client-p2p/types';
import { State } from './types';

import Interval from './messages/Interval';
import send from './send';

export default function sendInterval (self: State, peers: number, status: SyncStatus): void {
  const bestHash = self.blocks.bestHash.get();
  const bestNumber = self.blocks.bestNumber.get();

  send(self, new Interval(bestHash, bestNumber, peers, status));
}
