// @flow

declare module 'libp2p-kad-dht' {
  declare class LibP2PKadDHT {
    constructor (): LibP2PKadDHT;
  }

  declare module.exports: typeof LibP2PKadDHT;
}
