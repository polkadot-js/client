// @flow

declare module 'libp2p-secio' {
  declare class LibP2PSecio {
    constructor (): LibP2PSecio;
  }

  declare module.exports: typeof LibP2PSecio;
}
