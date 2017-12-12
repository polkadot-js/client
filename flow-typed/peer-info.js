// @flow

import type PeerId from 'peer-id';

declare module 'peer-info' {
  declare class MultiAddrSet {
    add (address: string): void;
    has (address: string): boolean;
  }

  declare type PeerInfo$CreateCb = (error: Error, peerInfo: PeerInfo) => void;

  declare class PeerInfo {
    constructor (): PeerInfo;

    multiaddrs: MultiAddrSet;

    static create (idOrCallback: PeerId | PeerInfo$CreateCb, callback?: PeerInfo$CreateCb): void;
  }

  declare module.exports: typeof PeerInfo;
}