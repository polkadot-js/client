// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { P2pInterface, SyncStatus } from './types';

import logger from '@polkadot/util/logger';

import announceBlock from './announceBlock';
import emitterOn from './emitterOn';
import start from './start';
import state from './state';
import stop from './stop';

const l = logger('p2p');

export default function server (config: Config, chain: ChainInterface, autoStart: boolean = true): P2pInterface {
  const self = state(l, config, chain);

  if (autoStart) {
    // tslint:disable-next-line
    start(self);
  }

  return {
    _announceBlock: (hash: Uint8Array, header: Uint8Array, body: Uint8Array): void =>
      announceBlock(self, hash, header, body),
    isStarted: (): boolean =>
      !!self.node,
    on: emitterOn(self),
    getSyncStatus: (): SyncStatus =>
      self.sync.status,
    getNumPeers: (): number =>
      self.peers.count(),
    start: (): Promise<boolean> =>
      start(self),
    stop: (): Promise<boolean> =>
      stop(self)
  };
}
