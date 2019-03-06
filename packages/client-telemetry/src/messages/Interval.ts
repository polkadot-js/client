// Copyright 2017-2019 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SyncStatus } from '@polkadot/client-p2p/types';
import { IntervalJson } from './types';

import BN from 'bn.js';
import BlockMessage from './BlockMessage';

let prevUsage = process.cpuUsage();
let prevTime = Date.now();

function cpuAverage () {
  const now = Date.now();
  const usage = process.cpuUsage(prevUsage);
  const total = Object.values(usage).reduce((total, value) => total + (value / 1000), 0);

  // Not sure why the factor is 10 vs 100 (but aligns with what is in OSX monitor)
  const calculated = 10 * (total / (now - prevTime)); // / os.cpus().length;

  prevTime = now;
  prevUsage = usage;

  return calculated;
}

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
      cpu: cpuAverage(),
      memory: Math.ceil(process.memoryUsage().heapTotal / 1024),
      peers: this.peers,
      status: this.status,
      txcount: this.txcount
    };
  }
}
