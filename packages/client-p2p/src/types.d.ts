// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
// import { LibP2pConnection } from 'interface-connection';
import LibP2p from 'libp2p';
import E3 from 'eventemitter3';
import { Logger } from '@polkadot/util/types';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-p2p-messages/types';
import { SyncState } from './sync/types';

export type SyncStatus = 'Idle' | 'Sync';

export type P2pNodes = Array<string>;

export type RawMessage = {
  message: {
    [index: string]: any
  },
  type: number
};

export type P2pNode = {
  address: string,
  port: number
};

export type P2pConfig = {
  address: string,
  clientId: string,
  maxPeers: number,
  nodes?: P2pNodes,
  port: number
};

export type PeerInterface$Events = 'message';

export type PeerInterface = {
  id: string,
  peerInfo: PeerInfo,
  shortId: string,
  addConnection: (connection: LibP2pConnection, isWritable: boolean) => void,
  isWritable: () => boolean,
  getBestHash: () => Uint8Array,
  getBestNumber: () => BN,
  getNextId: () => number,
  on (type: PeerInterface$Events, cb: (message: MessageInterface) => any): any,
  send: (message: MessageInterface) => boolean,
  setBest: (number: BN, hash: Uint8Array) => void
}

export type PeersInterface$Events = 'connected' | 'disconnected' | 'discovered' | 'message' | 'protocol';

export type PeersInterface = {
  add: (peerInfo: PeerInfo) => PeerInterface,
  count: () => number,
  get: (peerInfo: PeerInfo) => PeerInterface | undefined,
  log: (event: PeersInterface$Events, peer: PeerInterface) => void,
  on: (type: PeersInterface$Events, cb: (peer: any) => any) => any,
  peers: () => Array<PeerInterface>
}

export type P2pInterface$Events = 'started' | 'stopped';

export type P2pInterface = {
  _announceBlock: (hash: Uint8Array, header: Uint8Array, body: Uint8Array) => void,
  isStarted: () => boolean,
  on: (type: P2pInterface$Events, cb: () => any) => any,
  getNumPeers: () => number,
  getSyncStatus: () => SyncStatus,
  start: () => Promise<boolean>,
  stop: () => Promise<boolean>
}

export type P2pState = {
  chain: ChainInterface,
  config: Config,
  emitter: E3.EventEmitter,
  l: Logger,
  node: LibP2p,
  peers: PeersInterface,
  sync: SyncState
};
