// Copyright 2017-2019 @polkadot/client-signal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';

import EventEmitter from 'eventemitter3';
import Koa from 'koa';
import * as net from 'net';
import socketio from 'socket.io';
import { logger } from '@polkadot/util';

import defaults from './defaults';

const l = logger('wrtc/signal');

type Connected = {
  [index: string]: {
    ma: string,
    socket: net.Socket,
    offer: SSOffer | null
  }
};

type SSOffer = {
  answer?: boolean,
  dstMultiaddr: string,
  err?: string,
  intentId: string,
  srcMultiaddr: string,
  signal: {
    type: 'offer' | 'answer',
    sdp: string
  }
};

export default class WebRTCSignal extends EventEmitter {
  private config: Config;
  private connected: Connected;
  private server: net.Server | null;

  constructor (config: Config) {
    super();

    this.config = config;
    this.connected = {};
    this.server = null;
  }

  async start (): Promise<boolean> {
    await this.stop();

    const { port } = this.config.signal;
    const app = new Koa();
    const server = socketio(app.listen(port));

    server.on('connection', this.onConnection);
    this.server = server;

    l.log(`Server started on port=${port}`);

    this.emit('started');

    return true;
  }

  async stop (): Promise<boolean> {
    if (!this.server) {
      return false;
    }

    this.server.close();
    this.server = null;

    l.log('Server stopped');
    this.emit('stopped');

    return true;
  }

  private getId (ma: string): string {
    const parts = ma.split('/');

    return parts[parts.length - 1];
  }

  private send (ma: string | undefined | null, type: string, value: any) {
    if (!ma) {
      return false;
    }

    const id = this.getId(ma);

    if (!this.connected[id]) {
      return false;
    }

    this.connected[id].socket.emit(type, value);

    return true;
  }

  private onConnection = (socket: net.Socket) => {
    let id: string;
    let ma: string;
    let timerId: NodeJS.Timeout | null = null;

    const clear = () => {
      if (timerId) {
        clearInterval(timerId);

        timerId = null;
      }

      delete this.connected[id];
    };

    const provideAll = () => {
      Object.keys(this.connected).forEach((connId) => {
        if (connId === id) {
          return;
        }

        const peer = this.connected[id];

        this.send(ma, 'ws-peer', peer.ma);
      });
    };

    socket.on('ss-join', (_ma?: string) => {
      if (!_ma) {
        return;
      }

      ma = _ma;
      id = this.getId(ma);
      timerId = setInterval(provideAll, defaults.INTERVAL);

      this.connected[id] = { ma, offer: null, socket };

      provideAll();
    });

    socket.on('ss-handshake', (offer?: SSOffer) => {
      if (!offer || !offer.dstMultiaddr || !offer.srcMultiaddr || !offer.signal) {
        return;
      }

      if (offer.answer) {
        this.send(offer.srcMultiaddr, 'ws-handshake', offer);
      } else if (!this.send(offer.dstMultiaddr, 'ws-handshake', offer)) {
        offer.err = 'peer is not available';

        this.send(offer.srcMultiaddr, 'ws-handshake', offer);
      }
    });

    socket.on('ss-leave', clear);
    socket.on('disconnect', clear);
  };
}
