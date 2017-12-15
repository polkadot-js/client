// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { PeersInterface, PeersInterface$Events, PeerType } from './types';
import type Libp2p from 'libp2p';
import type PeerInfo from 'peer-info';

const EventEmitter = require('eventemitter3');

const assert = require('@polkadot/util/assert');
const stringShorten = require('@polkadot/util/string/shorten');
const l = require('@polkadot/util/logger')('p2p/peers');

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
    return this.peersConnected.length;
  }

  get peers (): Array<PeerType> {
    return ((Object.values(this._peers): any): Array<PeerType>);
  }

  get peersConnected (): Array<PeerType> {
    return this.peers.filter(({ isConnected }) => isConnected);
  }

  get (index: number): PeerType {
    return this.peers[index];
  }

  _logPeer (event: PeersInterface$Events, peer: PeerType): void {
    l.log(peer.shortId, event);
    this.emit(event, peer);
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

    this._logPeer('connected', peer);
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

    this._logPeer('disconnected', peer);
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
      connection: null,
      id,
      isConnected: false,
      isConnecting: false,
      peerInfo,
      shortId
    };

    this._logPeer('discovered', peer);
  }
};
