// @flow

declare module 'peer-id' {
  declare type PeerId$CreateCb = (error: Error, peerId: Buffer) => void;
  declare type PeerId$CreateOptions = {
    bits: number
  };

  declare class PeerId {
    constructor (id: Buffer, privKey: Buffer, pubKey: Buffer): PeerId;

    toB58String (): string;
    toJSON (): { [string]: any };

    static create (options: PeerId$CreateOptions, callback: PeerId$CreateCb): void;
  }

  declare module.exports: typeof PeerId;
}
