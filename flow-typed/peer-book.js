// @flow

declare module 'peer-book' {
  declare class PeerBook {
    constructor (): PeerBook;
  }

  declare module.exports: typeof PeerBook;
}
