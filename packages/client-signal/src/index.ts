// Copyright 2017-2019 @polkadot/client-signal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';

import EventEmitter from 'eventemitter3';
import Koa from 'koa';
import * as net from 'net';
import socketio from 'socket.io';
import { logger } from '@polkadot/util';

const l = logger('wrtc/signal');

type Sockets = {
  [index: string]: net.Socket
};

type MessageTypesOut = 'ws-handshake' | 'ws-peer';

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
  private server: net.Server | null;
  private sockets: Sockets;

  constructor (config: Config) {
    super();

    this.config = config;
    this.sockets = {};
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

  private send (ma: string | undefined | null, type: MessageTypesOut, value: any) {
    if (!ma || !this.sockets[ma]) {
      return false;
    }

    l.debug(() => ['send', type, value]);

    this.sockets[ma].emit(type, value);

    return true;
  }

  private sendConnected (newMa: string): void {
    Object.keys(this.sockets).forEach((ma) => {
      if (newMa !== ma) {
        // send new peer to old peer
        this.send(ma, 'ws-peer', newMa);

        // send old peer to new peer
        this.send(newMa, 'ws-peer', ma);
      }
    });
  }

  private onConnection = (socket: net.Socket) => {
    let ma: string;

    const clear = () => {
      l.debug(() => ['disconnect', ma]);

      delete this.sockets[ma];
    };

    socket.on('ss-join', (_ma?: string) => {
      l.debug(() => ['ss-join', _ma]);

      if (!_ma) {
        return;
      }

      ma = _ma;

      this.sockets[ma] = socket;
      this.sendConnected(ma);
    });

    socket.on('ss-handshake', (offer?: SSOffer) => {
      l.debug(() => ['ss-handshake', JSON.stringify(offer)]);

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
  }
}
