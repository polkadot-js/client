// ISC, Copyright 2017 Jaco Greeff
// @flow

import EventEmitter from 'eventemitter3'; // eslint-disable-line

declare module 'ethereumjs-devp2p' {
  declare type EjsDevP2pDpt$ConfigEndpoint = {
    address: string,
    udpPort: number | null,
    tcpPort: number | null
  };

  declare type EjsDevP2pDpt$Node = EjsDevP2pDpt$ConfigEndpoint & {
    id: Buffer
  };

  declare type EjsDevP2pDpt$Config = {
    clientId: string,
    endpoint: EjsDevP2pDpt$ConfigEndpoint
  };

  declare class EjsDevP2pDpt extends EventEmitter {
    constructor (privateKey: Buffer, config: EjsDevP2pDpt$Config): EjsDevP2pDpt;

    bind (port: number, address: string): void;
    bootstrap (node: EjsDevP2pDpt$ConfigEndpoint): Promise<EjsDevP2pDpt$Node>;
    addPeer (node: EjsDevP2pDpt$ConfigEndpoint): Promise<EjsDevP2pDpt$Node>;
  }

  declare type EjsDevP2pRlpx$Node = {
    address: string,
    id: Buffer,
    port: number
  };

  declare type EjsDevP2pCapability$Status = {
    bestHash: Buffer,
    genesisHash: Buffer,
    networkId: number,
    td: Buffer
  };

  declare interface EjsDevP2pCapability {
    _handleMessage (code: number, data: Buffer): any;
    getVersion (): number;
    sendStatus (status: EjsDevP2pCapability$Status): any;
    sendMessage (code: number, payload: Array<Buffer>): any;
  }

  declare type EjsDevP2pRlpx$Capability = {
    name: string,
    version: number,
    length: number,
    constructor: Class<EjsDevP2pCapability>
  };

  declare type EjsDevP2pRlpx$Config = {
    capabilities: Array<EjsDevP2pRlpx$Capability>,
    clientId: string,
    listenPort: number | null,
    maxPeers: number
  };

  declare class EjsDevP2pRlpx extends EventEmitter {
    constructor (privateKey: Buffer, config: EjsDevP2pRlpx$Config): EjsDevP2pRlpx;

    connect (node: EjsDevP2pRlpx$Node): Promise<any>;
    listen (port: number, address: string): void;
  }

  declare class EjsDevP2pEth {
    constructor (version: number, peer: EjsDevP2pRlpx$Node, send: (code: number, payload: Buffer) => void): EjsDevP2pEth;

    static eth62: EjsDevP2pRlpx$Capability;
    static eth63: EjsDevP2pRlpx$Capability;
    static MESSAGE_CODES: {
      [string]: number;
    };
  }

  declare module.exports: {
    DPT: Class<EjsDevP2pDpt>,
    RLPx: Class<EjsDevP2pRlpx>,
    ETH: Class<EjsDevP2pEth>,
    _util: {
      int2buffer: (number) => Buffer
    }
  }
}
