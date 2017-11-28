// ISC, Copyright 2017 Jaco Greeff
// @flow

import EventEmitter from 'evertemitter3'; // eslint-disable-line

declare module 'ethereumjs-devp2p' {
  declare type EjsDevP2pDpt$ConfigEndpoint = {
    address: string,
    udpPort: number | null,
    tcpPort: number | null
  };

  declare type EjsDevP2pDpt$Config = {
    clientId: string,
    endpoint: EjsDevP2pDpt$ConfigEndpoint
  };

  declare class EjsDevP2pDpt extends EventEmitter {
    constructor (privateKey: Buffer, config: EjsDevP2pDpt$Config): EjsDevP2pDpt;

    bind (port: number, address: string): void;
  }

  declare class EjsDevP2pCapability extends EventEmitter {
    constructor (version: string, peer: any, send: (code: number, payload: Buffer) => void): EjsDevP2pCapability;
  }

  declare type EjsDevP2pRlpx$Capability = {
    name: 'eth',
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

    listen (port: number, address: string): void;
  }

  declare class EjsDevP2pEth extends EjsDevP2pCapability {
    static eth62: EjsDevP2pRlpx$Capability;
    static eth63: EjsDevP2pRlpx$Capability;
  }

  declare module.exports: {
    DPT: Class<EjsDevP2pDpt>,
    RLPx: Class<EjsDevP2pRlpx>,
    ETH: Class<EjsDevP2pEth>
  }
}
