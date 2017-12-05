// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RoleType } from '@polkadot/client-types/role';

export type P2pErrorEventTypes =
  'comms.error' |
  'comms.error.peer' |
  'discover.error' |
  'discover.error.bootnode' |
  'discover.error.peer';

export type P2pDiscoverEventTypes =
  'discover.peer.added' |
  'discover.peer.removed';

export type P2pTransportEventTypes =
  'comms.peer.added' |
  'comms.peer.removed';

export type P2pEventTypes = P2pErrorEventTypes | P2pDiscoverEventTypes | P2pTransportEventTypes;

export type P2pNodeType = {
  address: string,
  port: number
};

export type P2pConfigType = {
  address?: string,
  clientId?: string,
  maxPeers?: number,
  port?: number,
  role?: RoleType
};

export type P2pOnErrorCallback = ({ message: string, type: P2pErrorEventTypes }) => void;

export interface P2pInterface {
  addBootnodes (nodes: Array<P2pNodeType>): Promise<void>;
  addPeers (nodes: Array<P2pNodeType>): Promise<void>;
  onError (handler: P2pOnErrorCallback): void;
}

export type P2pEmitFunc = (event: string, ...params?: Array<any>) => any;
