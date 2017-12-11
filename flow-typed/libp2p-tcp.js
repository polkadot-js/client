// @flow

declare module 'libp2p-tcp' {
  declare class LibP2PTCP {
    constructor (): LibP2PTCP;
  }

  declare module.exports: typeof LibP2PTCP;
}
