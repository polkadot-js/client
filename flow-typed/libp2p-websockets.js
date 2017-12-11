// @flow

declare module 'libp2p-websockets' {
  declare class LibP2PWebsockets {
    constructor (): LibP2PWebsockets;
  }

  declare module.exports: typeof LibP2PWebsockets;
}
