// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';

export interface MessageInterface {
  id: number,
  // flowlint-next-line unclear-type:off
  encode: () => [Uint8Array, Array<any>],
  // flowlint-next-line unclear-type:off
  decode: (id: number, raw: Array<any>) => any,
  // flowlint-next-line unclear-type:off
  raw: any
}

export type P2pNodeType = {
  address: string,
  port: number
};

export type P2pConfigType = {
  address: string,
  clientId: string,
  maxPeers: number,
  peers?: ChainConfigType$Nodes,
  port: number
};

export type PeerInterface$Events = 'message';

export type PeerInterface = {
  id: string,
  peerInfo: PeerInfo,
  shortId: string,
  addConnection: (connection: LibP2P$Connection) => boolean,
  isConnected: () => boolean,
  hasStatus: () => boolean,
  send: (message: MessageInterface) => boolean,
  setStatus: (status: MessageInterface) => void,
  // flowlint-next-line unclear-type:off
  on (type: PeerInterface$Events, (message: MessageInterface) => any): any;
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
  isStarted: () => boolean,
  // flowlint-next-line unclear-type:off
  on: (type: P2pInterface$Events, () => any) => any,
  peers: () => PeersInterface,
  start: () => Promise<boolean>,
  stop: () => Promise<boolean>
}
