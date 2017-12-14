// ISC, Copyright 2017 Jaco Greeff
// @flow

import type Libp2p from 'libp2p';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { P2pConfigType, P2pInterface, PeerType } from './types';

const assert = require('@polkadot/util/assert');
const isObject = require('@polkadot/util/is/object');
const promisify = require('@polkadot/util/promisify');
const l = require('@polkadot/util/logger')('p2p');
const EventEmitter = require('eventemitter3');

const Peers = require('./peers');
const createNode = require('./create/node');
const protocolHandler = require('./protocol/handler');
const defaults = require('./defaults');

module.exports = class Server extends EventEmitter implements P2pInterface {
  _config: P2pConfigType;
  _chain: ChainConfigType;
  _node: Libp2p;
  _peers: Peers;

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

  get peers (): Peers {
    return this._peers;
  }

  async start (): Promise<void> {
    this.stop();

    this._node = await createNode(this._config, this._chain);
    this._node.on('start', () => this.emit('started'));
    this._node.on('stop', () => this.emit('stopped'));
    this._node.handle(defaults.PROTOCOL, protocolHandler);

    this._peers = new Peers(this._node);
    this._peers.on('discovered', this._dialPeer);

    await promisify(this._node, this._node.start);

    l.log(`Started on address=${this._config.address}, port=${this._config.port}`);
  }

  async stop (): Promise<void> {
    if (!this._node) {
      return;
    }

    const node = this._node;

    // $FlowFixMe setting the _node to ?Libp2p above doesn't do the trick, it complains in start - something funky going on in the start() method
    this._node = null;

    // $FlowFixMe same...
    this._peers = null;

    await promisify(node, node.stop);

    l.log('Server stopped');
  }

  _dialPeer = async (peer: PeerType): any => {
    if (!peer || peer.isConnecting) {
      return;
    }

    peer.isConnecting = true;
    peer.isConnected = false;

    try {
      await promisify(this._node, this._node.dial, peer.peerInfo, defaults.PROTOCOL);
    } catch (error) {
      peer.isConnecting = false;
    }
  }
};
