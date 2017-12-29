// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';

export interface MessageInterface {
  constructor (data: any): any;

  encode (): [Buffer, Array<any>];
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
  on (type: PeerInterface$Events, (message: MessageInterface) => any): any;
}

export type PeersInterface$Events = 'connected' | 'disconnected' | 'discovered';

export interface PeersInterface {
  +count: number;

  on (type: PeersInterface$Events, (peer: any) => any): any;
}

export type P2pInterface$Events = 'message' | 'started' | 'stopped';

export interface P2pInterface {
  +peers: PeersInterface;

  on (type: P2pInterface$Events, () => any): any;
}
