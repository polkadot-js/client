// ISC, Copyright 2017 Jaco Greeff
// @flow

import type LibP2P, { LibP2P$Connection } from 'libp2p';
import type { ConfigType } from '@polkadot/client/types';
import type { StateInterface } from '@polkadot/client-state/types';
import type { MessageInterface, P2pInterface, PeerInterface } from './types';

const EventEmitter = require('eventemitter3');

const promisify = require('@polkadot/util/promisify');
const l = require('@polkadot/util/logger')('p2p');

const Peers = require('./peers');
const createNode = require('./create/node');
const StatusMessage = require('./message/status');
const defaults = require('./defaults');

module.exports = class Server extends EventEmitter implements P2pInterface {
  _config: ConfigType;
  _node: LibP2P;
  _peers: Peers;
  _state: StateInterface;

  constructor (config: ConfigType, state: StateInterface, autoStart: boolean = true) {
    super();

    this._config = config;
    this._state = state;

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

    this._node = await createNode(this._config.p2p.address, this._config.p2p.port, this._state.chain, this._config.p2p.peers);
    this._node.handle(defaults.PROTOCOL, this._onProtocol);

    this._peers = new Peers(this._node);
    this._peers.on('connected', this._onPeerConnected);
    this._peers.on('discovered', this._onPeerDiscovery);
    this._peers.on('message', this._onMessage);

    await promisify(this._node, this._node.start);

    l.log(`Started on address=${this._config.p2p.address}, port=${this._config.p2p.port}`);
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

  _onMessage = ({ peer, message }: { peer: PeerInterface, message: MessageInterface }): void => {
    if (message.id === StatusMessage.MESSAGE_ID) {
      this._sendStatus(peer);
      peer.status = ((message: any): StatusMessage);
    }

    this.emit('message', {
      peer,
      message
    });
  }

  _onPeerConnected = (peer: PeerInterface): void => {
    this._sendStatus(peer);
  }

  _onProtocol = async (protocol: string, connection: LibP2P$Connection): Promise<void> => {
    const peerInfo = await promisify(connection, connection.getPeerInfo);

    this._peers.add(peerInfo, connection);
  }

  _sendStatus = (peer: PeerInterface): boolean => {
    // setTimeout(() => this._sendStatus(peer), 5000);

    return peer.send(
      new StatusMessage({
        roles: this._config.roles,
        bestNumber: this._state.best.number,
        bestHash: this._state.best.hash,
        genesisHash: this._state.genesis.hash
      })
    );
  }
};
