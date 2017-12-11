// @flow

declare module 'libp2p-railing' {
  declare class LibP2PRailing {
    constructor (bootnodes: Array<string>): LibP2PRailing;
  }

  declare module.exports: typeof LibP2PRailing;
}
