// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { SyncStatus } from '@polkadot/client-p2p/types';
import { IntervalJson } from './types';

import BN from 'bn.js';
import BlockMessage from './BlockMessage';

export default class Interval extends BlockMessage {
  readonly peers: number;
  readonly status: SyncStatus;
  readonly txcount: number = 0;

  constructor (bestHash: Uint8Array, bestNumber: BN, peers: number, status: SyncStatus) {
    super('system.interval', bestHash, bestNumber);

    this.peers = peers;
    this.status = status;
  }

  toJSON (): IntervalJson {
    return {
      ...super.toJSON(),
      peers: this.peers,
      status: this.status,
      txcount: this.txcount
    };
  }
}
