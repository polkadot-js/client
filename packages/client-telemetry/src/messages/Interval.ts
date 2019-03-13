// Copyright 2017-2019 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SyncStatus } from '@polkadot/client-p2p/types';
import { IntervalJson } from './types';

import BN from 'bn.js';
import BlockMessage from './BlockMessage';

// let prevTime = process.hrtime();
// let prevTotal = calcCpuTotal(process.cpuUsage());

// function calcCpuTotal (usage: NodeJS.CpuUsage): number {
//   return Object.values(usage).reduce((total, value) => total + value, 0);
// }

// function ns2ms ([s, ns]: [number, number]): number {
//   return (s * 1000) + (ns / 1000000);
// }

// function cpuUsage () {
//   const now = process.hrtime();
//   const elapsed = ns2ms(now) - ns2ms(prevTime);
//   const total = calcCpuTotal(process.cpuUsage());

//   // Not sure why the factor is 10 here...
//   const calculated = ((total - prevTotal) / elapsed) / 10;

//   prevTime = now;
//   prevTotal = total;

//   return calculated;
// }

// function memoryUsage () {
//   const usage = process.memoryUsage();

//   return Math.ceil((usage.heapTotal) / 1024);
// }

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
      // cpu: cpuUsage(),
      // memory: memoryUsage(),
      peers: this.peers,
      status: this.status,
      txcount: this.txcount
    };
  }
}
