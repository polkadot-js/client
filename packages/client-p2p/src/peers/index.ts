// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import LibP2p from 'libp2p';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-p2p-messages/types';
import { Logger } from '@polkadot/util/types';
import { PeerInterface, PeersInterface, PeersInterface$Events } from '../types';

import E3 from 'eventemitter3';
import PeerInfo from 'peer-info';
import logger from '@polkadot/util/logger';

import Peer from '../peer';

export default class Peers extends E3.EventEmitter implements PeersInterface {
  readonly chain: ChainInterface;
  readonly config: Config;
  readonly l: Logger;
  private map: {
    [index: string]: PeerInterface
  };

  constructor (config: Config, chain: ChainInterface, node: LibP2p) {
    super();

    this.chain = chain;
    this.config = config;
    this.l = logger('p2p/peers');
    this.map = {};

    this._onConnect(node);
    this._onDisconnect(node);
    this._onDiscovery(node);
  }

  add (peerInfo: PeerInfo): PeerInterface {
    const id = peerInfo.id.toB58String();
    let peer = this.map[id];

    if (!peer) {
      this.map[id] = peer = new Peer(this.config, this.chain, peerInfo);

      peer.on('message', (message: MessageInterface): void => {
        this.emit('message', {
          message,
          peer
        });
      });
    }

    return peer;
  }

  count (): number {
    return Object.keys(this.map).length;
  }

  log (event: PeersInterface$Events, peer: PeerInterface, withShort: boolean = true): void {
    this.l.log(withShort ? peer.shortId : peer.id, event);

    this.emit(event, peer);
  }

  get (peerInfo: PeerInfo): PeerInterface | undefined {
    const id = peerInfo.id.toB58String();

    return this.map[id];
  }

  peers (): Array<PeerInterface> {
    return Object.keys(this.map).map((id) =>
      this.map[id]
    );
  }

  private _onConnect (node: LibP2p): void {
    node.on('peer:connect', (peerInfo: PeerInfo): boolean => {
      if (!peerInfo) {
        return false;
      }

      const peer = this.get(peerInfo);

      if (!peer) {
        return false;
      }

      this.log('connected', peer);

      return true;
    });
  }

  private _onDisconnect (node: LibP2p): void {
    node.on('peer:disconnect', (peerInfo: PeerInfo): boolean => {
      if (!peerInfo) {
        return false;
      }

      const peer = this.get(peerInfo);

      if (!peer) {
        return false;
      }

      delete this.map[peer.id];

      this.log('disconnected', peer);

      return true;
    });
  }

  private _onDiscovery (node: LibP2p): void {
    node.on('peer:discovery', (peerInfo: PeerInfo): boolean => {
      if (!peerInfo) {
        return false;
      }

      let peer = this.get(peerInfo);

      if (peer) {
        return false;
      }

      peer = this.add(peerInfo);

      this.log('discovered', peer, false);

      return true;
    });
  }
}
