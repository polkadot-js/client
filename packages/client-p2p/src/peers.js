// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { PeersInterface, PeersInterface$Events, PeerInterface } from './types';
import type LibP2P, { LibP2P$Connection } from 'libp2p';
import type PeerInfo from 'peer-info';

const EventEmitter = require('eventemitter3');

const l = require('@polkadot/util/logger')('p2p/peers');
const promisify = require('@polkadot/util/promisify');

const defaults = require('./defaults');
const Peer = require('./peer');

module.exports = class Peers extends EventEmitter implements PeersInterface {
  _node: LibP2P;
  _peers: { [string]: PeerInterface };

  constructor (node: LibP2P) {
    super();

    this._node = node;
    this._peers = {};

    node.on('peer:connect', this._onConnect);
    node.on('peer:disconnect', this._onDisconnect);
    node.on('peer:discovery', this._onDiscovery);
  }

  get count (): number {
    return Object.keys(this._peers).length;
  }

  get connectedCount (): number {
    return this.peersConnected.length;
  }

  get peers (): Array<PeerInterface> {
    return ((Object.values(this._peers): any): Array<PeerInterface>);
  }

  get peersConnected (): Array<PeerInterface> {
    return this.peers.filter(({ isConnected }) => isConnected);
  }

  getIndex (index: number): PeerInterface {
    return this.peers[index];
  }

  get (peerInfo: PeerInfo): ?PeerInterface {
    const id = peerInfo.id.toB58String();

    return this._peers[id];
  }

  add (peerInfo: PeerInfo, connection: ?LibP2P$Connection): PeerInterface {
    const id = peerInfo.id.toB58String();
    let peer = this._peers[id];

    if (!peer) {
      peer = this._peers[id] = new Peer(peerInfo);
      peer.on('message', (message: MessageInterface) => {
        this.emit('message', {
          message,
          peer
        });
      });
    }

    if (connection) {
      peer.addConnection(connection);
    }

    return peer;
  }

  _logPeer (event: PeersInterface$Events, peer: PeerInterface): void {
    l.log(peer.shortId, event);
    this.emit(event, peer);
  }

  _onConnect = (peerInfo: PeerInfo): any => {
    const peer = this.get(peerInfo);

    if (!peer) {
      return;
    }

    this._logPeer('connected', peer);
  }

  _onDisconnect = (peerInfo: PeerInfo): any => {
    const peer = this.get(peerInfo);

    if (!peer) {
      return;
    }

    const id = peer.id;

    delete this._peers[id];

    this._logPeer('disconnected', peer);
  }

  _onDiscovery = async (peerInfo: PeerInfo): Promise<boolean> => {
    if (!peerInfo) {
      return false;
    }

    let peer = this.get(peerInfo);

    if (peer) {
      return false;
    }

    try {
      const connection = await promisify(this._node, this._node.dial, peerInfo, defaults.PROTOCOL);

      peer = this.add(peerInfo, connection);
    } catch (error) {
      return false;
    }

    this._logPeer('discovered', peer);

    return true;
  }
};
