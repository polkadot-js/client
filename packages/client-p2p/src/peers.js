// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { PeersInterface, PeerType } from './types';
import type Libp2p from 'libp2p';
import type PeerInfo from 'peer-info';

const assert = require('@polkadot/util/assert');
const stringShorten = require('@polkadot/util/string/shorten');
const l = require('@polkadot/util/logger')('p2p/peers');
const EventEmitter = require('eventemitter3');

module.exports = class Peers extends EventEmitter implements PeersInterface {
  _peers: { [string]: PeerType };

  constructor (emitter: Libp2p) {
    super();

    assert(emitter, 'Expected to receive a Libp2p emitter');

    this._peers = {};

    emitter.on('peer:connect', this._onConnect);
    emitter.on('peer:disconnect', this._onDisconnect);
    emitter.on('peer:discovery', this._onDiscovery);
  }

  get count (): number {
    return Object.keys(this._peers).length;
  }

  get connectedCount (): number {
    return this.getConnected().length;
  }

  getConnected (): Array<PeerType> {
    return ((Object.values(this._peers): any): Array<PeerType>)
      .filter(({ isConnected }) => isConnected);
  }

  _onConnect = (peerInfo: PeerInfo): any => {
    if (!peerInfo) {
      return;
    }

    const id = peerInfo.id.toB58String();
    const peer = this._peers[id];

    if (!peer || peer.isConnected) {
      return;
    }

    peer.isConnecting = false;
    peer.isConnected = true;

    l.log(peer.shortId, 'connected');
    this.emit('connected', peer);
  }

  _onDisconnect = (peerInfo: PeerInfo): any => {
    if (!peerInfo) {
      return;
    }

    const id = peerInfo.id.toB58String();
    const peer = this._peers[id];

    if (!peer) {
      return;
    }

    delete this._peers[id];

    l.log(peer.shortId, 'disconnected');
    this.emit('disconnected', peer);
  }

  _onDiscovery = (peerInfo: PeerInfo): any => {
    if (!peerInfo) {
      return;
    }

    const id = peerInfo.id.toB58String();
    let peer = this._peers[id];

    if (peer && (peer.isConnecting || peer.isConnected)) {
      return;
    }

    const shortId = stringShorten(id);

    peer = this._peers[id] = {
      id,
      isConnected: false,
      isConnecting: false,
      peerInfo,
      shortId
    };

    l.log(shortId, 'discovered');
    this.emit('discovered', peer);
  }
};
