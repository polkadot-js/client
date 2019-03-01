// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-types/messages/types';
import { Logger } from '@polkadot/util/types';
import { P2pInterface, PeerInterface, PeersInterface } from './types';

import handlers from './handler';

import EventEmitter from 'eventemitter3';
import handshake from 'pull-handshake';
import PullPushable from 'pull-pushable';
import pull from 'pull-stream';
import { logger, promisify, u8aToBuffer } from '@polkadot/util';
import { randomAsU8a } from '@polkadot/util-crypto';

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
  nextDial: number
};

const DIAL_BACKOFF = 5 * 60000;
const DIAL_INTERVAL = 15000;
const REQUEST_INTERVAL = 15000;
const PING_INTERVAL = 30000;
// const PING_TIMEOUT = 5000;

const l = logger('p2p');

export default class P2p extends EventEmitter implements P2pInterface {
  readonly chain: ChainInterface;
  readonly config: Config;
  readonly l: Logger;
  private dialQueue: { [index: string]: QueuedPeer };
  private node: LibP2p | undefined;
  private peers: PeersInterface | undefined;
  private protocol: string;
  private dialTimer: NodeJS.Timer | null;
  readonly sync: Sync;

  constructor (config: Config, chain: ChainInterface) {
    super();

    this.config = config;
    this.chain = chain;
    this.l = l;
    this.sync = new Sync(config, chain);
    this.dialQueue = {};
    this.dialTimer = null;
    this.protocol = defaults.getProtocol(chain.chain.protocolId);
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

    this.node._dht.randomWalk.start();
    this._requestAny();

    return true;
  }

  async stop (): Promise<boolean> {
    if (!this.node) {
      return false;
    }

    if (this.dialTimer !== null) {
      clearTimeout(this.dialTimer);
      this.dialTimer = null;
    }

    const node = this.node;

    delete this.node;
    delete this.peers;

    node._dht.randomWalk.stop();
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
      this.protocol,
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
            l.debug(() => ['ping error', error]);
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

    l.debug(() => `Starting ping with ${peer.shortId}`);

    try {
      const connection = await promisify(
        this.node, this.node.dialProtocol, peer.peerInfo, defaults.PROTOCOL_PING
      );

      const stream = handshake({ timeout: 60000 }, (error) => {
        if (error) {
          l.warn(() => ['ping disconnected', peer.shortId, error]);
          peer.disconnect();
        }
      });
      const shake = stream.handshake;

      pull(
        stream,
        connection,
        stream
      );

      const doPing = () => {
        const start = Date.now();
        const request = u8aToBuffer(randomAsU8a());

        shake.write(request);
        shake.read(32, (error, response) => {
          if (!error && request.equals(response)) {
            const elapsed = Date.now() - start;

            l.debug(`Ping from ${peer.shortId} ${elapsed}ms`);
            // setTimeout(doPing, PING_INTERVAL);
            // return;
          } else if (error) {
            l.warn(() => [`error on reading ping from ${peer.shortId}`]);
          } else {
            l.warn(() => `wrong ping received from ${peer.shortId}`);
          }

          setTimeout(doPing, PING_INTERVAL);
          return;

          // peer.disconnect();
          // shake.abort();
        });
      };

      doPing();
    } catch (error) {
      l.error(`error opening ping with ${peer.shortId}`, error);

      return false;
    }

    return true;
  }

  private async _dialPeer (peer: PeerInterface, peers: PeersInterface): Promise<boolean> {
    if (!this.node) {
      return false;
    }

    l.debug(() => `dialing ${peer.shortId}`);

    try {
      const connection = await promisify(
        this.node, this.node.dialProtocol, peer.peerInfo, this.protocol
      );

      await this._pingPeer(peer);

      peer.addConnection(connection, true);
      peers.log('dialled', peer);

      return true;
    } catch (error) {
      l.error('dial error', error);
    }

    return false;
  }

  private _dialPeers (peer?: PeerInterface): void {
    if (this.dialTimer !== null) {
      clearTimeout(this.dialTimer);
      this.dialTimer = null;
    }

    this.dialTimer = setTimeout(() => {
      this._dialPeers();
    }, DIAL_INTERVAL);

    const now = Date.now();

    if (peer && !this.dialQueue[peer.id]) {
      this.dialQueue[peer.id] = {
        nextDial: now,
        peer
      };
    }

    if (!this.node || !this.node.isStarted()) {
      return;
    }

    Object.keys(this.dialQueue).forEach(
      async (id: string): Promise<void> => {
        const item = this.dialQueue[id];

        if (!this.peers || item.nextDial > now || item.peer.isActive()) {
          return;
        }

        item.nextDial = now + DIAL_BACKOFF;

        await this._dialPeer(item.peer, this.peers);
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
    }, REQUEST_INTERVAL);
  }
}
