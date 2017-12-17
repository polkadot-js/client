// ISC, Copyright 2017 Jaco Greeff
// @flow

import type Libp2p from 'libp2p';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { MessageInterface, P2pConfigType, P2pInterface, PeerType } from './types';

const EventEmitter = require('eventemitter3');
const pull = require('pull-stream');

const assert = require('@polkadot/util/assert');
const isInstanceOf = require('@polkadot/util/is/instanceOf');
const isObject = require('@polkadot/util/is/object');
const isUndefined = require('@polkadot/util/is/undefined');
const promisify = require('@polkadot/util/promisify');
const l = require('@polkadot/util/logger')('p2p');

const Peers = require('./peers');
const createNode = require('./create/node');
const BaseMessage = require('./message/base');
const StatusMessage = require('./message/status');
const { streamReader, streamWriter } = require('./stream');
const defaults = require('./defaults');

module.exports = class Server extends EventEmitter implements P2pInterface {
  _config: P2pConfigType;
  _chain: ChainConfigType;
  _node: Libp2p;
  _peers: Peers;

  constructor (config: P2pConfigType, chain: ChainConfigType, autoStart: boolean = true) {
    super();

    assert(isObject(config), 'Expected P2P configuration');
    assert(isObject(chain), 'Expected chain definition');

    this._config = config;
    this._chain = chain;

    if (autoStart) {
      this.start();
    }
  }

  get peers (): Peers {
    return this._peers;
  }

  get isStarted (): boolean {
    return !!this._node;
  }

  async start (): Promise<boolean> {
    this.stop();

    this._node = await createNode(this._config, this._chain);
    this._node.handle(defaults.PROTOCOL, this._receive);

    this._peers = new Peers(this._node);
    this._peers.on('discovered', this._dialPeer);

    await promisify(this._node, this._node.start);

    l.log(`Started on address=${this._config.address}, port=${this._config.port}`);
    this.emit('started');

    return true;
  }

  async stop (): Promise<boolean> {
    if (!this._node) {
      return false;
    }

    const node = this._node;

    // $FlowFixMe setting the _node to ?Libp2p above doesn't do the trick, it complains in start - something funky going on in the start() method
    this._node = null;

    // $FlowFixMe same...
    this._peers = null;

    await promisify(node, node.stop);

    l.log('Server stopped');
    this.emit('stopped');

    return true;
  }

  _dialPeer = async (peer: PeerType): Promise<boolean> => {
    if (!peer || peer.isConnecting) {
      return false;
    }

    peer.isConnecting = true;
    peer.isConnected = false;

    try {
      peer.connection = await promisify(this._node, this._node.dial, peer.peerInfo, defaults.PROTOCOL);

      this._send(peer.connection, new StatusMessage());
    } catch (error) {
      peer.isConnecting = false;
      return false;
    }

    return true;
  }

  _handleMessage = (message: MessageInterface): void => {
    assert(isInstanceOf(message, BaseMessage), 'Expected valid message');

    this.emit('message', message);
  }

  _receive = (protocol: string, connection: any): void => {
    assert(protocol === defaults.PROTOCOL, `Expected matching protocol, '${protocol}' received`);
    assert(!isUndefined(connection), 'Expected valid connection');

    pull(
      connection,
      streamReader(this._handleMessage)
    );
  }

  _send = (connection: any, message: MessageInterface): void => {
    assert(!isUndefined(connection), 'Expected valid connection');
    assert(isInstanceOf(message, BaseMessage), 'Expected valid message');

    pull(
      streamWriter(message),
      connection
    );
  }
};
