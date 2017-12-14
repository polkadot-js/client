// ISC, Copyright 2017 Jaco Greeff
// @flow

import type Libp2p from 'libp2p';
import type PeerId from 'peer-id';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { P2pConfigType, P2pInterface, P2pOnErrorCallback } from './types';

const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const isObject = require('@polkadot/util/is/object');
const promisify = require('@polkadot/util/promisify');
const l = require('@polkadot/util/logger')('p2p');
const EventEmitter = require('eventemitter3');

const attachError = require('./attach/error');
const createNode = require('./create/node');
const defaults = require('./defaults');

module.exports = class Server extends EventEmitter implements P2pInterface {
  _config: P2pConfigType;
  _chain: ChainConfigType;
  _server: Libp2p;

  // TODO: Save peers, pass through valid PeerBook for known nodes as part of the setup process (could also specify these on the commandline)
  constructor (config: P2pConfigType, chain: ChainConfigType, autoStart: boolean = true) {
    super();

    assert(isObject(config), 'Expected a P2P configuration object');

    assert(isObject(chain), 'Expected a chain definition object');

    this._config = config;
    this._chain = chain;

    if (autoStart) {
      this.start();
    }
  }

  async start (): Promise<void> {
    this.stop();

    this._server = await createNode(this._config, this._chain, this._config.peers);

    if (!this._server) {
      throw new ExtError('Unable to start server');
    }

    // this._server.on('start', (event) => l.log('event:start', event));
    // this._server.on('stop', (event) => l.log('event:stop', event));
    this._server.on('peer:connect', (peer: PeerId) => l.log('event:peer:connect', peer.toB58String()));
    this._server.on('peer:disconnect', (peer: PeerId) => l.log('event:peer:disconnect', peer.toB58String()));
    this._server.on('peer:discovery', (peer: PeerId) => l.log('event:peer:discovery', peer.toB58String()));

    // this._server.swarm.on('peer-mux-established', (peerInfo) => {
    //   console.log('received dial to me from:', peerInfo.id.toB58String());
    // });

    this._server.handle(defaults.PROTOCOL, this._handleConnection);

    await promisify((callback) => this._server.start(callback));

    const { address, port } = this._config;

    l.log(`Started on address=${address}, port=${port}`);
  }

  async stop (): Promise<void> {
    if (!this._server) {
      return;
    }

    const server = this._server;

    // $FlowFixMe setting the _server to ?Libp2p above doesn't do the trick, it complains in start - something funky going on in the start() method
    this._server = null;
    await promisify((callback) => server.stop(callback));

    l.log('Server stopped');
  }

  _handleConnection = (protocol: string, conn: any): void => {
    l.log('Connection', protocol, conn);
    // pull(conn, conn)
  }

  onError (handler: P2pOnErrorCallback): void {
    attachError(this, handler);
  }
};
