// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type EventEmitter from 'eventemitter3';
import type LibP2P from 'libp2p';
import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Logger } from '@polkadot/util/types';
import type { PeersInterface } from '../types';

export type P2pState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  l: Logger,
  node: LibP2P,
  peers: PeersInterface,
};
