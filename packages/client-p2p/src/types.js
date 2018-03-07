// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { LibP2P$Connection } from 'libp2p';
import type { ChainConfig$Nodes } from '@polkadot/client-chains/types';

export type RawMessage = {
  // flowlint-next-line unclear-type: off
  message: any,
  type: number
};

export interface MessageInterface {
  encode: () => RawMessage,
  // flowlint-next-line unclear-type:off
  decode: (message: RawMessage) => any,
  // flowlint-next-line unclear-type:off
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
  peers?: ChainConfig$Nodes,
  port: number
};

export type PeerInterface$Events = 'message';

export type PeerInterface = {
  id: string,
  peerInfo: PeerInfo,
  shortId: string,
  addConnection: (connection: LibP2P$Connection) => boolean,
  getBestHash: () => Uint8Array,
  getBestNumber: () => BN,
  // flowlint-next-line unclear-type:off
  on (type: PeerInterface$Events, (message: MessageInterface) => any): any,
  send: (message: MessageInterface) => boolean,
  setBest: (number: BN, hash: Uint8Array) => void
}

export type PeersInterface$Events = 'connected' | 'disconnected' | 'discovered' | 'message';

export type PeersInterface = {
  add: (peerInfo: PeerInfo) => PeerInterface,
  count: () => number,
  get: (peerInfo: PeerInfo) => ?PeerInterface,
  // flowlint-next-line unclear-type:off
  on: (type: PeersInterface$Events, (peer: any) => any) => any,
  peers: () => Array<PeerInterface>
}

export type P2pInterface$Events = 'message' | 'started' | 'stopped';

export type P2pInterface = {
  _announceBlock: (hash: Uint8Array, header: Uint8Array, body: Uint8Array) => void,
  isStarted: () => boolean,
  // flowlint-next-line unclear-type:off
  on: (type: P2pInterface$Events, () => any) => any,
  start: () => Promise<boolean>,
  stop: () => Promise<boolean>
}
