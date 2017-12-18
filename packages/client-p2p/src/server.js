// ISC, Copyright 2017 Jaco Greeff
// @flow

import type Libp2p from 'libp2p';
import type { ChainConfigType, ChainConfigType$Nodes } from '@polkadot/client-chains/types';
import type { MessageInterface, P2pConfigType, P2pInterface, PeerType } from './types';

const EventEmitter = require('eventemitter3');
const pull = require('pull-stream');

const promisify = require('@polkadot/util/promisify');
const l = require('@polkadot/util/logger')('p2p');

const Peers = require('./peers');
const createNode = require('./create/node');
const StatusMessage = require('./message/status');
const { streamReader, streamWriter } = require('./stream');
const defaults = require('./defaults');

module.exports = class Server extends EventEmitter implements P2pInterface {
  _address: string;
  _chain: ChainConfigType;
  _node: Libp2p;
  _peerAddresses: ChainConfigType$Nodes;
  _peers: Peers;
  _port: number;

  constructor ({ address = defaults.ADDRESS, peers = [], port = defaults.PORT }: P2pConfigType, chain: ChainConfigType, autoStart: boolean = true) {
    super();

    this._address = address;
    this._peerAddresses = peers;
    this._port = port;
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

    this._node = await createNode(this._address, this._port, this._chain, this._peerAddresses);
    this._node.handle(defaults.PROTOCOL, this._receive);

    this._peers = new Peers(this._node);
    this._peers.on('discovered', this._dialPeer);

    await promisify(this._node, this._node.start);

    l.log(`Started on address=${this._address}, port=${this._port}`);
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

  _dialPeer = async (peer: PeerType): any => {
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
    this.emit('message', message);
  }

  _receive = (protocol: string, connection: any): void => {
    pull(
      connection,
      streamReader(this._handleMessage)
    );
  }

  _send = (connection: any, message: MessageInterface): void => {
    pull(
      streamWriter(message),
      connection
    );
  }
};
