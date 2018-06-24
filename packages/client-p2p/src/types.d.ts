// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import LibP2P, { LibP2P$Connection } from 'libp2p';
import EventEmitter from 'eventemitter3';
import { Logger } from '@polkadot/util/types';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { SyncState } from './sync/types';

export type P2pNodes = Array<string>;

export type RawMessage = {
  message: any,
  type: number
};

export interface MessageInterface {
  encode: () => RawMessage,
  decode: (message: RawMessage) => any,
  raw: any,
  type: number
}

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
  addConnection: (connection: LibP2P$Connection, isWritable: boolean) => void,
  isWritable: () => boolean,
  getBestHash: () => Uint8Array,
  getBestNumber: () => BN,
  getNextId: () => number,
  on (type: PeerInterface$Events, (message: MessageInterface) => any): any,
  send: (message: MessageInterface) => boolean,
  setBest: (number: BN, hash: Uint8Array) => void
}

export type PeersInterface$Events = 'connected' | 'disconnected' | 'discovered' | 'message' | 'protocol';

export type PeersInterface = {
  add: (peerInfo: PeerInfo) => PeerInterface,
  count: () => number,
  get: (peerInfo: PeerInfo) => ?PeerInterface,
  log: (event: PeersInterface$Events, peer: PeerInterface) => void,
  on: (type: PeersInterface$Events, (peer: any) => any) => any,
  peers: () => Array<PeerInterface>
}

export type P2pInterface$Events = 'started' | 'stopped';

export type P2pInterface = {
  _announceBlock: (hash: Uint8Array, header: Uint8Array, body: Uint8Array) => void,
  isStarted: () => boolean,
  on: (type: P2pInterface$Events, () => any) => any,
  start: () => Promise<boolean>,
  stop: () => Promise<boolean>
}

export type P2pState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  l: Logger,
  node: LibP2P,
  peers: PeersInterface,
  sync: SyncState
};
