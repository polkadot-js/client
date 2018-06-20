// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { P2pInterface } from './types';

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
    start(self);
  }

  return {
    _announceBlock: (hash: Uint8Array, header: Uint8Array, body: Uint8Array): void =>
      announceBlock(self, hash, header, body),
    isStarted: (): boolean =>
      !!self.node,
    on: emitterOn(self),
    start: (): Promise<boolean> =>
      start(self),
    stop: (): Promise<boolean> =>
      stop(self)
  };
}
