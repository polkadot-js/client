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

type Options = {
  wrtc?: any;
};

function once (callback: (...params: Array<any>) => void) {
  let wasCalled = false;

  return (...params: Array<any>): void => {
    if (!wasCalled) {
      wasCalled = true;

      callback(...params);
    }
  };
}

function createUrl (ma: Multiaddr) {
  const [,, host,, maPort] = ma.toString().split('/');
  const [, tcp, ws] = ma.protos();
  const tcpPort = ma.stringTuples()[1][1];

  assert(tcp.name === 'tcp' && ['ws', 'wss'].includes(ws.name), `Invalid multiaddr: ${ma}`);

  return multiaddr.isName(ma)
    ? `${ws.name === 'ws' ? 'http' : 'https'}://${host}:${tcpPort}`
    : `http://${host}:${maPort}`;
}

const l = logger('wrtc/client');
const noop = () => void 0;

class Discovery extends EventEmitter {
  tag: string = 'webRTCStar';

  start (callback: () => void) {
    callback();
  }

  stop (callback: () => void) {
    callback();
  }
}

class Listener extends EventEmitter {
  private handler: Function;
  private onDiscovery: (addr: string) => void;
  private options: Options;
  private ma?: Multiaddr;
  io: any;
  srcMultiaddr: string = '<unknown>';

  constructor (options: Options, handler: Function, onDiscovery: (addr: string) => void) {
    super();

    this.handler = handler;
    this.onDiscovery = onDiscovery;
    this.options = options;
  }

  listen (ma: Multiaddr, _callback: (error: Error | null) => void = noop) {
    const callback = once(_callback);

    if (!this.options.wrtc && !getBrowserRtc()) {
      return callback(new Error('WebRTC is not supported by your environment'));
    }

    try {
      const url = createUrl(ma);

      l.debug(() => `Dialing to signalling server, ${url}`);

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

      const incommingDial = (offer: SSOffer) => {
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
          l.debug(() => ['Could not create incoming connection:', error]);

          return callback(error);
        }

        const conn = new Connection(toPull.duplex(channel));

        channel.once('connect', () => {
          conn.getObservedAddrs = (callback: (error: Error | null, addrs: Array<string>) => void) => {
            return callback(null, [offer.srcMultiaddr]);
          };

          this.emit('connection', conn);
          this.handler(conn);
        });

        channel.once('signal', (signal: SSSignal) => {
          offer.signal = signal;
          offer.answer = true;

          io.emit('ss-handshake', offer);
        });

        channel.signal(offer.signal);
      };

      io.on('ws-handshake', incommingDial);
      io.on('ws-peer', this.onDiscovery);

      io.on('connect', () => {
        io.emit('ss-join', ma.toString());
      });

      io.once('connect', () => {
        this.emit('listening');

        callback();
      });

    } catch (error) {
      return callback(error);
    }
  }

  close (callback: () => any = noop): void {
    this.emit('close');

    callback();
  }

  getAddrs (callback: (errror: null, mas: Array<Multiaddr>) => void): void {
    callback(null, [this.ma as Multiaddr]);
  }
}

export default class WebRTCClient {
  discovery: Discovery;
  private listeners: Array<Listener>;
  private options: Options;

  constructor (options: Options = {}) {
    this.options = options;

    this.discovery = new Discovery();
    this.listeners = [];
  }

  createListener (options: Function): Listener;
  createListener (options: Options, handler: Function): Listener;
  createListener (options: Options | Function, handler?: Function): Listener {
    if (typeof options === 'function') {
      handler = options;
      options = {};
    }

    const listener = new Listener({ ...options, wrtc: this.options.wrtc }, handler as Function, this.onDiscovery);

    this.listeners.push(listener);

    return listener;
  }

  dial (ma: Multiaddr, options: any, _callback: any) {
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
      l.debug(() => ['Could not create connection', error]);

      return callback(error);
    }

    const conn = new Connection(toPull.duplex(channel));
    let connected = false;

    channel.on('signal', (signal: any) => {
      sioClient.emit('ss-handshake', {
        intentId,
        srcMultiaddr: listener.srcMultiaddr,
        dstMultiaddr: ma.toString(),
        signal
      });
    });

    channel.once('timeout', () =>
      callback(new Error('timeout'))
    );

    channel.once('error', (error: Error) => {
      if (!connected) {
        callback(error);
      }
    });

    sioClient.on('ws-handshake', (offer: SSOffer) => {
      if (offer.intentId === intentId && offer.err) {
        return callback(new Error(offer.err));
      }

      if (offer.intentId !== intentId || !offer.answer) {
        return;
      }

      channel.once('connect', () => {
        connected = true;
        conn.destroy = channel.destroy.bind(channel);

        channel.once('close', () => conn.destroy());

        conn.getObservedAddrs = (callback: (error: Error | null, mas: Array<Multiaddr>) => void) =>
          callback(null, [ma]);

        callback(null, conn);
      });

      channel.signal(offer.signal);
    });

    return conn;
  }

  filter (multiaddrs: Multiaddr | Array<Multiaddr>): Array<Multiaddr> {
    return (Array.isArray(multiaddrs) ? multiaddrs : [multiaddrs]).filter((ma) =>
      ma.protoNames().indexOf('p2p-circuit') !== -1
        ? false
        : mafmt.WebRTCStar.matches(ma)
    );
  }

  onDiscovery = (addr: string): void => {
    l.debug(() => `Peer Discovered ${addr}`);

    const split = addr.split('/ipfs/');
    const peerIdStr = split[split.length - 1];
    const peerId = PeerId.createFromB58String(peerIdStr);
    const peerInfo = new PeerInfo(peerId);

    peerInfo.multiaddrs.add(multiaddr(addr));

    this.discovery.emit('peer', peerInfo);
  }
}
