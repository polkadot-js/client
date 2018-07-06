// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { SyncStatus } from '@polkadot/client-p2p/types';
import { State, Telemetry } from './types';

import './polyfill';

import connect from './connect';
import sendBlockImport from './sendBlockImport';
import sendInterval from './sendInterval';
import createState from './state';

let self: State;

function init (config: Config, chain: ChainInterface): void {
  self = createState(config, chain);

  if (self.isActive) {
    self.l.log(`Connecting to telemetry, url=${self.url}, name=${self.name}`);

    connect(self);
  }
}

const telemetry: Telemetry = {
  blockImported: (): void =>
    sendBlockImport(self),
  intervalInfo: (peers: number, status: SyncStatus): void =>
    sendInterval(self, peers, status),
  init
};

export default telemetry;
