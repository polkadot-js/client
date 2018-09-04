// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-p2p-messages/types';
import { Logger } from '@polkadot/util/types';
import { P2pInterface, PeerInterface, PeersInterface } from './types';

import handlers from './handler';

import EventEmitter from 'eventemitter3';
// import handshake from 'pull-handshake';
import PullPushable from 'pull-pushable';
import pull from 'pull-stream';
import logger from '@polkadot/util/logger';
import promisify from '@polkadot/util/promisify';

import createNode from './create/node';
import defaults from './defaults';
import Peers from './peers';
import Sync from './sync';

type OnMessage = {
  peer: PeerInterface,
  message: MessageInterface
};

type QueuedPeer = {
  peer: PeerInterface,
  isDialled: boolean
};

const l = logger('p2p');

export default class P2p extends EventEmitter implements P2pInterface {
  readonly chain: ChainInterface;
  readonly config: Config;
  readonly l: Logger;
  private dialQueue: Array<QueuedPeer> = [];
  private node: LibP2p | undefined;
  private peers: PeersInterface | undefined;
  readonly sync: Sync;

  constructor (config: Config, chain: ChainInterface) {
    super();

    this.config = config;
    this.chain = chain;
    this.l = l;
    this.sync = new Sync(config, chain);
  }

  isStarted (): boolean {
    return !!this.node;
  }

  getNumPeers (): number {
    return this.peers
      ? this.peers.count()
      : 0;
  }

  async start (): Promise<boolean> {
    await this.stop();

    this.node = await createNode(this.config, this.chain, l);
    this.peers = new Peers(this.config, this.chain, this.node);

    this._handleProtocol(this.node, this.peers);
    this._handlePing(this.node);
    this._onPeerDiscovery(this.node, this.peers);
    this._onPeerMessage(this.node, this.peers);

    await promisify(this.node, this.node.start);

    l.log(`Started on address=${this.config.p2p.address}, port=${this.config.p2p.port}`);
    this.emit('started');

    this._requestAny();

    return true;
  }

  async stop (): Promise<boolean> {
    if (!this.node) {
      return false;
    }

    const node = this.node;

    delete this.node;
    delete this.peers;

    await promisify(node, node.stop);

    l.log('Server stopped');
    this.emit('stopped');

    return true;
  }

  // _announceBlock (hash: Uint8Array, _header: Uint8Array, body: Uint8Array): void {
  //   if (!this.peers) {
  //     return;
  //   }

  //   const header = decodeHeader(_header);
  //   const message = new BlockAnnounce({
  //     header
  //   });

  //   this.peers.peers().forEach((peer) => {
  //     if (header.number.gt(peer.bestNumber)) {
  //       peer.send(message);
  //     }
  //   });
  // }

  private _onPeerDiscovery (node: LibP2p, peers: PeersInterface): void {
    node.on('start', () =>
      this._dialPeers()
    );

    peers.on('discovered', (peer: PeerInterface): void => {
      this._dialPeers(peer);
    });
  }

  private _onPeerMessage (node: LibP2p, peers: PeersInterface): void {
    peers.on('message', ({ peer, message }: OnMessage): void => {
      const handler = handlers.find(({ type }) =>
        type === message.type
      );

      if (!handler) {
        l.error(`Unhandled message type=${message.type}`);
        return;
      }

      handler(this, peer, message);
    });
  }

  private _handleProtocol (node: LibP2p, peers: PeersInterface): void {
    node.handle(
      defaults.PROTOCOL_DOT,
      async (protocol: string, connection: LibP2pConnection): Promise<void> => {
        try {
          const peerInfo = await promisify(connection, connection.getPeerInfo);
          const peer = peers.add(peerInfo);

          peers.log('protocol', peer);
          peer.addConnection(connection, true);

          if (!peer.isWritable()) {
            this._dialPeers(peer);
          }
        } catch (error) {
          l.error('protocol handling error', error);
        }
      }
      // , (protocol: string, requested: string, callback: (error: null, accept: boolean) => void): void => {
      //   l.debug(() => `matching protocol ${requested}`);

      //   callback(null, requested.indexOf(defaults.PROTOCOL) === 0);
      // }
    );
  }

  private _handlePing (node: LibP2p): void {
    node.handle(
      defaults.PROTOCOL_PING,
      async (protocol: string, connection: LibP2pConnection): Promise<void> => {
        try {
          const pushable = PullPushable((error) => {
            console.error('handlePing', error);
          });

          pull(pushable, connection);
          pull(
            connection,
            pull.drain(
              (buffer: Buffer): void => {
                l.debug(() => ['ping (protocol)']);

                pushable.push(buffer);
              },
              () => false
            )
          );
        } catch (error) {
          l.error('ping handling error', error);
        }
      }
    );
  }

  private async _pingPeer (peer: PeerInterface): Promise<boolean> {
    if (!this.node) {
      return false;
    }

    try {
      // NOTE Onl;y dial here, however the handling of ping are done in the _handlePing function
      // const connection =
      await promisify(
        this.node, this.node.dialProtocol, peer.peerInfo, defaults.PROTOCOL_PING
      );
      // const pushable = PullPushable((error) => {
      //   console.error('pingPeer', error);
      // });

      // pull(pushable, connection);

      // // FIXME Once uni-directional pings are available network-wide, properly ping,
      // // don't just pong. (However the libp2p-ping floods the network as it stands)
      // pull(
      //   connection,
      //   pull.drain(
      //     (buffer: Buffer): void => {
      //       l.log(() => ['ping', peer.shortId]);

      //       pushable.push(buffer);
      //     },
      //     () => false
      //   )
      // );
    } catch (error) {
      l.error(`error opening ping with ${peer.shortId}`, error);

      return false;
    }

    return true;
  }

  private async _dialPeer (peer: PeerInterface): Promise<boolean> {
    if (!this.node) {
      return false;
    }

    l.debug(() => `dialing ${peer.shortId}`);

    try {
      const connection = await promisify(
        this.node, this.node.dialProtocol, peer.peerInfo, defaults.PROTOCOL_DOT
      );

      await this._pingPeer(peer);

      peer.addConnection(connection, true);

      return true;
    } catch (error) {
      // l.error('dial error', error);
    }

    return false;
  }

  private _dialPeers (peer?: PeerInterface): void {
    if (peer !== undefined) {
      this.dialQueue.push({
        isDialled: false,
        peer
      });
    }

    if (!this.node || !this.node.isStarted()) {
      return;
    }

    this.dialQueue.forEach(
      async (item: QueuedPeer): Promise<void> => {
        if (item.isDialled) {
          return;
        }

        item.isDialled = await this._dialPeer(item.peer);
      }
    );
  }

  private _requestAny (): void {
    if (this.peers) {
      this.peers.peers().forEach((peer) =>
        this.sync.requestBlocks(peer)
      );
    }

    setTimeout(() => {
      this._requestAny();
    }, 15000);
  }
}
