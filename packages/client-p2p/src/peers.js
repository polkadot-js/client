// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { PeersInterface, PeersInterface$Events, PeerInterface } from './types';
import type LibP2P from 'libp2p';
import type PeerInfo from 'peer-info';

const EventEmitter = require('eventemitter3');

const l = require('@polkadot/util/logger')('p2p/peers');

const Peer = require('./peer');

module.exports = class Peers extends EventEmitter implements PeersInterface {
  _peers: { [string]: PeerInterface };

  constructor (node: LibP2P) {
    super();

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

  get (peerInfo: PeerInfo): ?PeerInterface {
    const id = peerInfo.id.toB58String();

    return this._peers[id];
  }

  add (peerInfo: PeerInfo): PeerInterface {
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

    return peer;
  }

  _logPeer (event: PeersInterface$Events, peer: PeerInterface): void {
    l.log(peer.shortId, event);
    this.emit(event, peer);
  }

  _onConnect = (peerInfo: PeerInfo): boolean => {
    if (!peerInfo) {
      return false;
    }

    const peer = this.get(peerInfo);

    if (!peer) {
      return false;
    }

    if (peer.hasConnection(peerInfo.isConnected())) {
      return false;
    }

    this._logPeer('connected', peer);

    return true;
  }

  _onDisconnect = (peerInfo: PeerInfo): boolean => {
    if (!peerInfo) {
      return false;
    }

    const peer = this.get(peerInfo);

    if (!peer) {
      return false;
    }

    const id = peer.id;

    delete this._peers[id];

    this._logPeer('disconnected', peer);

    return true;
  }

  _onDiscovery = (peerInfo: PeerInfo): boolean => {
    if (!peerInfo) {
      return false;
    }

    let peer = this.get(peerInfo);

    if (peer) {
      return false;
    }

    peer = this.add(peerInfo);

    this._logPeer('discovered', peer);

    return true;
  }
};
