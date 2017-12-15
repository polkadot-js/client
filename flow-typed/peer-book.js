// @flow

import type PeerInfo from 'peer-info';

declare module 'peer-book' {
  declare class PeerBook {
    constructor (): PeerBook;

    put (peerInfo: PeerInfo): void;
    getAll (): { [string]: PeerInfo };
    getAllArray (): Array<PeerInfo>;
  }

  declare module.exports: typeof PeerBook;
}
