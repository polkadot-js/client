// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
  public readonly chain: ChainInterface;

  public readonly config: Config;

  private map: Map<string, KnownPeer> = new Map();

  private node: LibP2p;

  public constructor (config: Config, chain: ChainInterface, node: LibP2p) {
    super();

    this.chain = chain;
    this.config = config;
    this.node = node;

    this._onConnect(node);
    this._onDisconnect(node);
    this._onDiscovery(node);
  }

  public add (peerInfo: PeerInfo): PeerInterface {
    const id = peerInfo.id.toB58String();
    const info = this.map.get(id);

    if (info) {
      return info.peer;
    }

    const peer = new Peer(this.config, this.chain, this.node, peerInfo);
    this.map.set(id, {
      peer,
      isActive: false,
      isConnected: false
    });

    peer.on('active', (): void => {
      const item = this.map.get(id);

      if (!item || item.isActive) {
        return;
      }

      item.isActive = true;
      this.log('active', peer, false);
    });

    peer.on('message', (message: MessageInterface): void => {
      this.emit('message', {
        message,
        peer
      });
    });

    return peer;
  }

  public countAll (): number {
    return this.map.size;
  }

  public count (): number {
    return [...this.map.values()]
      .filter(({ peer }): boolean => peer.isActive())
      .length;
  }

  public log (event: PeersInterface$Events, peer: PeerInterface, withDebug = true, withShort = true): void {
    l[withDebug ? 'debug' : 'log']((): any[] => [withShort ? peer.shortId : peer.id, event]);

    this.emit(event, peer);
  }

  public get (peerInfo: PeerInfo): KnownPeer | undefined {
    const id = peerInfo.id.toB58String();

    return this.map.get(id);
  }

  public peers (): PeerInterface[] {
    return [...this.map.values()].map(({ peer }): PeerInterface => peer);
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
      this.log('connected', info.peer, false);

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

      info.isActive = false;
      info.isConnected = false;
      info.peer.disconnect();

      this.log('disconnected', info.peer, false);

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

      this.log('discovered', peer, false);

      return true;
    });
  }
}
