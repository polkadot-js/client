// ISC, Copyright 2017 Jaco Greeff
// @flow

export type P2pTypes = 'devp2p' | 'libp2p';

export type P2pNodeType = {
  address: string,
  port: number
};

export type P2pConfigType = {
  address?: string,
  clientId?: string,
  maxPeers?: number,
  privateKey?: Buffer,
  port?: number,
  type: P2pTypes
};

export type P2pOnErrorCallback = ({ message: string, type: string }) => void;

export interface P2pInterface {
  addBootnodes (bootnodes: Array<P2pNodeType>): Promise<void>;
  onError (handler: P2pOnErrorCallback): void
}

type P2pDiscoverEventTypes = 'discover.error' | 'discover.peer.added' | 'discover.peer.removed';
type P2pTransportEventTypes = '';

export type P2pEventTypes = P2pDiscoverEventTypes | P2pTransportEventTypes;

export type P2pEmitFunc = (event: string, ...params?: any[]) => any;
