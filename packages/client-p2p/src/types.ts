// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
// import { LibP2pConnection } from 'interface-connection';
import LibP2p from 'libp2p';
import EventEmitter from 'eventemitter3';
import { Logger } from '@polkadot/util/types';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-types/messages/types';
import { SyncState } from './sync/types';
import Sync from './sync';

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
  noBootnodes: boolean,
  port: number
};

export type PeerInterface$Events = 'active' | 'message' | 'disconnected';

export interface PeerInterface {
  readonly bestHash: Uint8Array;
  readonly bestNumber: BN;
  readonly id: string;
  readonly peerInfo: PeerInfo;
  readonly shortId: string;

  addConnection: (connection: LibP2pConnection, isWritable: boolean) => number;
  disconnect (): void;
  isActive: () => boolean;
  isWritable: () => boolean;
  getNextId: () => number;
  on (type: PeerInterface$Events, cb: (message: MessageInterface) => any): any;
  send: (message: MessageInterface) => boolean;
  setBest: (blockNumber: BN, hash: Uint8Array) => void;
}

export type PeersInterface$Events = 'active' | 'connected' | 'dialled' | 'disconnected' | 'discovered' | 'message' | 'protocol';

export type KnownPeer = {
  peer: PeerInterface,
  isConnected: boolean
};

export type PeersInterface = {
  add: (peerInfo: PeerInfo) => PeerInterface,
  count: () => number,
  get: (peerInfo: PeerInfo) => KnownPeer | undefined,
  log: (event: PeersInterface$Events, peer: PeerInterface) => void,
  on: (type: PeersInterface$Events, cb: (peer: any) => any) => any,
  peers: () => Array<PeerInterface>
};

export type P2pInterface$Events = 'started' | 'stopped';

export type P2pInterface = {
  readonly l: Logger;
  readonly sync: Sync;

  // _announceBlock: (hash: Uint8Array, header: Uint8Array, body: Uint8Array) => void,
  isStarted: () => boolean,
  on: (type: P2pInterface$Events, cb: () => any) => any,
  getNumPeers: () => number,
  start: () => Promise<boolean>,
  stop: () => Promise<boolean>
};

export type P2pState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  l: Logger,
  node: LibP2p,
  peers: PeersInterface,
  sync: SyncState
};
