// @flow

import type PeerInfo from 'peer-info';

declare module 'libp2p-mdns' {
  declare type LibP2PMdns$Config = {
    broadcast?: boolean,
    interval?: number,
    serviceTag?: string
  };

  declare class LibP2PMdns {
    constructor (peerInfo: PeerInfo, options?: LibP2PMdns$Config): LibP2PMdns;
  }

  declare module.exports: typeof LibP2PMdns;
}
