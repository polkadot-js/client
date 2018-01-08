// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';

export interface MessageInterface {
  constructor (data: mixed): mixed;

  // flowlint-next-line unclear-type:off
  encode (): [Buffer, Array<any>];
  // flowlint-next-line unclear-type:off
  decode (id: number, raw: Array<any>): void;
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

export interface PeerInterface {
  // flowlint-next-line unclear-type:off
  on (type: PeerInterface$Events, (message: MessageInterface) => any): any;
}

export type PeersInterface$Events = 'connected' | 'disconnected' | 'discovered';

export interface PeersInterface {
  +count: number;

  // flowlint-next-line unclear-type:off
  on (type: PeersInterface$Events, (peer: mixed) => any): any;
}

export type P2pInterface$Events = 'message' | 'started' | 'stopped';

export interface P2pInterface {
  +peers: PeersInterface;

  // flowlint-next-line unclear-type:off
  on (type: P2pInterface$Events, () => any): any;
}
