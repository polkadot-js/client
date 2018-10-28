// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import LibP2p from 'libp2p';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-types/messages/types';
import { KnownPeer, PeerInterface, PeersInterface, PeersInterface$Events } from '../types';

import EventEmitter from 'eventemitter3';
import PeerInfo from 'peer-info';
import { logger } from '@polkadot/util';

import Peer from '../peer';

const l = logger('p2p/peers');

export default class Peers extends EventEmitter implements PeersInterface {
  readonly chain: ChainInterface;
  readonly config: Config;
  private map: {
    [index: string]: KnownPeer
  };

  constructor (config: Config, chain: ChainInterface, node: LibP2p) {
    super();

    this.chain = chain;
    this.config = config;
    this.map = {};

    this._onConnect(node);
    this._onDisconnect(node);
    this._onDiscovery(node);
  }

  add (peerInfo: PeerInfo): PeerInterface {
    const id = peerInfo.id.toB58String();
    const info = this.map[id];

    if (info) {
      return info.peer;
    }

    const peer = new Peer(this.config, this.chain, peerInfo);
    this.map[id] = {
      peer,
      isConnected: false
    };

    peer.on('active', () => {
      this.map[id].isConnected = true;
      this.log('active', peer, false);
    });

    peer.on('disconnected', () => {
      if (!this.map[id].isConnected) {
        return;
      }

      this.map[id].isConnected = false;
      this.log('disconnected', peer);
    });

    peer.on('message', (message: MessageInterface): void => {
      this.emit('message', {
        message,
        peer
      });
    });

    return peer;
  }

  countAll (): number {
    return Object
      .values(this.map)
      .length;
  }

  count (): number {
    return Object
      .values(this.map)
      .filter(({ peer }) =>
        peer.isActive()
      ).length;
  }

  log (event: PeersInterface$Events, peer: PeerInterface, withDebug: boolean = true, withShort: boolean = true): void {
    l[withDebug ? 'debug' : 'log'](() => [withShort ? peer.shortId : peer.id, event]);

    this.emit(event, peer);
  }

  get (peerInfo: PeerInfo): KnownPeer | undefined {
    const id = peerInfo.id.toB58String();

    return this.map[id];
  }

  peers (): Array<PeerInterface> {
    return Object.keys(this.map).map((id) =>
      this.map[id].peer
    );
  }

  private _onConnect (node: LibP2p): void {
    node.on('peer:connect', (peerInfo: PeerInfo): boolean => {
      if (!peerInfo) {
        return false;
      }

      const info = this.get(peerInfo);

      if (!info || info.isConnected) {
        return false;
      }

      info.isConnected = true;
      this.log('connected', info.peer);

      return true;
    });
  }

  private _onDisconnect (node: LibP2p): void {
    node.on('peer:disconnect', (peerInfo: PeerInfo): boolean => {
      if (!peerInfo) {
        return false;
      }

      const info = this.get(peerInfo);

      if (!info || !info.isConnected) {
        return false;
      }

      info.isConnected = false;
      this.log('disconnected', info.peer);

      return true;
    });
  }

  private _onDiscovery (node: LibP2p): void {
    node.on('peer:discovery', (peerInfo: PeerInfo): boolean => {
      if (!peerInfo) {
        return false;
      }

      const info = this.get(peerInfo);

      if (info) {
        return false;
      }

      const peer = this.add(peerInfo);

      this.log('discovered', peer, false, false);

      return true;
    });
  }
}
