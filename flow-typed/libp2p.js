// @flow

import type KadDHT from 'libp2p-kad-dht';
import type Multiplex from 'libp2p-multiplex';
import type Railing from 'libp2p-railing';
import type Secio from 'libp2p-secio';
import type Spdy from 'libp2p-spdy';
import type TCP from 'libp2p-tcp';
import type Websockets from 'libp2p-websockets';
import type PeerBook from 'peer-book';
import type PeerInfo from 'peer-info';

declare type LibP2P$Config = {
  DHT: Class<KadDHT>,
  connection: {
    crypto: Array<Class<Secio>>,
    muxer: Array<Class<Multiplex> | Class<Spdy>>
  },
  discovery: Array<Multiplex | Railing>,
  transport: Array<TCP | Websockets>
};

declare module 'libp2p' {
  declare type LibP2P$Events = 'peer:connect' | 'peer:disconnect' | 'peer:discovery' | 'start' | 'stop';

  declare class LibP2P {
    constructor (config?: LibP2P$Config, peerInfo?: PeerInfo, peerBook?: PeerBook): LibP2P;

    handle (protocol: string, (protocol: string, conn: any) => any): void;
    on (event: LibP2P$Events, callback: (event: any) => any): void;
    start ((error: Error) => any): void;
    stop ((error: Error) => any): void;
  }

  declare module.exports: typeof LibP2P;
}
