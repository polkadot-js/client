// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';
import type { RoleType } from '@polkadot/primitives/role';
import type PeerInfo from 'peer-info';

export type P2pNodeType = {
  address: string,
  port: number
};

export type P2pConfigType = {
  address: string,
  clientId: string,
  maxPeers: number,
  peers?: ChainConfigType$Nodes,
  port: number,
  role: RoleType
};

export type PeerType = {
  id: string,
  isConnected: boolean,
  isConnecting: boolean,
  peerInfo: PeerInfo,
  shortId: string
};

export type PeersInterface$Events = 'connected' | 'disconnected' | 'discovered';

export interface PeersInterface {
  +count: number;
  +connectedCount: number;

  on (type: PeersInterface$Events, (peer: PeerType) => any): any;
}

export type P2pInterface$Events = 'started' | 'stopped';

export interface P2pInterface {
  +peers: PeersInterface;

  on (type: P2pInterface$Events, () => any): any;
}
