// Copyright 2017-2019 @polkadot/client-signal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SSOffer, SSSignal } from './types';

import EventEmitter from 'eventemitter3';
import getBrowserRtc from 'get-browser-rtc';
import { Connection } from 'interface-connection';
import mafmt from 'mafmt';
import multiaddr, { Multiaddr } from 'multiaddr';
import PeerId from 'peer-id';
import PeerInfo from 'peer-info';
import SimplePeer from 'simple-peer';
import socketio from 'socket.io-client';
import toPull from 'stream-to-pull-stream';
import { assert, logger } from '@polkadot/util';

interface Options {
  wrtc?: any;
}

function once (fn: (...params: any[]) => void): (...params: any[]) => void {
  let wasCalled = false;

  return (...params: any[]): void => {
    if (!wasCalled) {
      wasCalled = true;

      fn(...params);
    }
  };
}

function createUrl (ma: Multiaddr): string {
  const [,, host,, maPort] = ma.toString().split('/');
  const [, tcp, ws] = ma.protos();
  const tcpPort = ma.stringTuples()[1][1];

  assert(tcp.name === 'tcp' && ['ws', 'wss'].includes(ws.name), `Invalid multiaddr: ${ma}`);

  return multiaddr.isName(ma)
    ? `${ws.name === 'ws' ? 'http' : 'https'}://${host}:${tcpPort}`
    : `http://${host}:${maPort}`;
}

const l = logger('wrtc/client');
const noop = (): void => {};

class Discovery extends EventEmitter {
  public tag: string = 'webRTCStar';

  public start (fn: () => void): void {
    fn();
  }

  public stop (fn: () => void): void {
    fn();
  }
}

class Listener extends EventEmitter {
  private handler: Function;

  private onDiscovery: (addr: string) => void;

  private options: Options;

  private ma?: Multiaddr;

  public io: any;

  public srcMultiaddr: string = '<unknown>';

  public constructor (options: Options, handler: Function, onDiscovery: (addr: string) => void) {
    super();

    this.handler = handler;
    this.onDiscovery = onDiscovery;
    this.options = options;
  }

  public listen (ma: Multiaddr, _callback: (error: Error | null) => void = noop): void {
    const callback = once(_callback);

    if (!this.options.wrtc && !getBrowserRtc()) {
      return callback(new Error('WebRTC is not supported by your environment'));
    }

    try {
      const url = createUrl(ma);

      l.debug((): string => `Dialing to signalling server, ${url}`);

      this.ma = ma;
      this.srcMultiaddr = ma.toString();

      const io = socketio.connect(url, {
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 60000,
        transports: ['websocket']
      });

      this.io = io;

      const incommingDial = (offer: SSOffer): void => {
        if (offer.answer || offer.err) {
          return;
        }

        let channel;

        try {
          channel = new SimplePeer({
            trickle: false,
            wrtc: this.options.wrtc
          });
        } catch (error) {
          l.debug((): any[] => ['Could not create incoming connection:', error]);

          return callback(error);
        }

        const conn = new Connection(toPull.duplex(channel));

        channel.once('connect', (): void => {
          conn.getObservedAddrs = (callback: (error: Error | null, addrs: string[]) => void): void => {
            return callback(null, [offer.srcMultiaddr]);
          };

          this.emit('connection', conn);
          this.handler(conn);
        });

        channel.once('signal', (signal: SSSignal): void => {
          offer.signal = signal;
          offer.answer = true;

          io.emit('ss-handshake', offer);
        });

        channel.signal(offer.signal);
      };

      io.on('ws-handshake', incommingDial);
      io.on('ws-peer', this.onDiscovery);

      io.on('connect', (): void => {
        io.emit('ss-join', ma.toString());
      });

      io.once('connect', (): void => {
        this.emit('listening');

        callback();
      });
    } catch (error) {
      return callback(error);
    }
  }

  public close (fn: () => any = noop): void {
    this.emit('close');

    fn();
  }

  public getAddrs (callback: (errror: null, mas: Multiaddr[]) => void): void {
    callback(null, [this.ma as Multiaddr]);
  }
}

export default class WebRTCClient {
  public discovery: Discovery;

  private listeners: Listener[];

  private options: Options;

  public constructor (options: Options = {}) {
    this.options = options;

    this.discovery = new Discovery();
    this.listeners = [];
  }

  public createListener (options: Function): Listener;

  // eslint-disable-next-line no-dupe-class-members
  public createListener (options: Options, handler: Function): Listener;

  // eslint-disable-next-line no-dupe-class-members
  public createListener (options: Options | Function, handler?: Function): Listener {
    if (typeof options === 'function') {
      handler = options;
      options = {};
    }

    const listener = new Listener({ ...options, wrtc: this.options.wrtc }, handler as Function, this.onDiscovery);

    this.listeners.push(listener);

    return listener;
  }

  public dial (ma: Multiaddr, options: any, _callback: any): void {
    if (typeof options === 'function') {
      _callback = options;
      options = {};
    }

    const callback = once(_callback);
    const intentId = (~~(Math.random() * 1e9)).toString(36) + Date.now();
    const listener = this.listeners[this.listeners.length - 1];
    const sioClient = listener.io;

    let channel: any;

    try {
      channel = new SimplePeer({
        initiator: true,
        trickle: false,
        wrtc: this.options.wrtc
      });
    } catch (error) {
      l.debug((): any[] => ['Could not create connection', error]);

      return callback(error);
    }

    const conn = new Connection(toPull.duplex(channel));
    let connected = false;

    channel.on('signal', (signal: any): void => {
      sioClient.emit('ss-handshake', {
        intentId,
        srcMultiaddr: listener.srcMultiaddr,
        dstMultiaddr: ma.toString(),
        signal
      });
    });

    channel.once('timeout', (): void =>
      callback(new Error('timeout'))
    );

    channel.once('error', (error: Error): void => {
      if (!connected) {
        callback(error);
      }
    });

    sioClient.on('ws-handshake', (offer: SSOffer): void => {
      if (offer.intentId === intentId && offer.err) {
        return callback(new Error(offer.err));
      }

      if (offer.intentId !== intentId || !offer.answer) {
        return;
      }

      channel.once('connect', (): void => {
        connected = true;
        conn.destroy = channel.destroy.bind(channel);

        channel.once('close', (): void => conn.destroy());

        conn.getObservedAddrs = (callback: (error: Error | null, mas: Multiaddr[]) => void): void =>
          callback(null, [ma]);

        callback(null, conn);
      });

      channel.signal(offer.signal);
    });

    return conn;
  }

  public filter (multiaddrs: Multiaddr | Multiaddr[]): Multiaddr[] {
    return (Array.isArray(multiaddrs) ? multiaddrs : [multiaddrs]).filter((ma): boolean =>
      ma.protoNames().indexOf('p2p-circuit') !== -1
        ? false
        : mafmt.WebRTCStar.matches(ma)
    );
  }

  public onDiscovery = (addr: string): void => {
    l.debug((): string => `Peer Discovered ${addr}`);

    const split = addr.split('/ipfs/');
    const peerIdStr = split[split.length - 1];
    const peerId = PeerId.createFromB58String(peerIdStr);
    const peerInfo = new PeerInfo(peerId);

    peerInfo.multiaddrs.add(multiaddr(addr));

    this.discovery.emit('peer', peerInfo);
  }
}
