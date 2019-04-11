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
import pull from 'pull-stream';
import Sync from '@polkadot/client-sync';
import { logger, promisify } from '@polkadot/util';

import createNode from './create/node';
import defaults from './defaults';
import Peers from './peers';

type OnMessage = {
  peer: PeerInterface,
  message: MessageInterface
};

type QueuedPeer = {
  peer: PeerInterface,
  nextDial: number
};

const DIAL_INTERVAL = 15000;
const REQUEST_INTERVAL = 15000;

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
    this.dialQueue = {};
    this.dialTimer = null;
    this.protocol = defaults.getProtocol(chain.chain.protocolId);
    this.sync = new Sync(this.config, this.chain);
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
    this.sync.setPeers(this.peers);

    this._handleProtocol(this.node, this.peers);
    this._handlePing(this.node);
    this._onPeerDiscovery(this.node, this.peers);
    this._onPeerMessage(this.node, this.peers);

    await promisify(this.node, this.node.start);

    l.log(`Started with bootnodes ${this.config.p2p.discoverBoot ? 'en' : 'dis'}abled & star ${this.config.p2p.discoverStar ? 'en' : 'dis '}abled`);
    this.emit('started');

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

    if (this.sync) {
      this.sync.stop();
    }

    if (this.peers) {
      this.peers.peers().forEach((peer) => {
        peer.disconnect();
      });
    }

    const node = this.node;

    delete this.node;
    delete this.peers;

    await promisify(node, node.stop);

    l.log('Server stopped');
    this.emit('stopped');

    return true;
  }

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
      //   console.error(`matching protocol ${requested}`);

      //   callback(null, requested.indexOf(this.protocol) === 0);
      // }
    );
  }

  private _handlePing (node: LibP2p): void {
    node.handle(
      defaults.PROTOCOL_PING,
      async (protocol: string, connection: LibP2pConnection): Promise<void> => {
        try {
          const stream = handshake({ timeout: defaults.WAIT_TIMEOUT });
          const shake = stream.handshake;
          const next = () => {
            shake.read(defaults.PING_LENGTH, (error, buffer) => {
              if (error) {
                // l.debug(() => ['ping error', error]);
                return;
              }

              // l.debug(() => ['ping (protocol)']);
              shake.write(buffer);

              next();
            });
          };

          pull(connection, stream, connection);
          next();
        } catch (error) {
          l.error('ping handling error', error);
        }
      }
    );
  }

  private async _dialPeer ({ peer }: QueuedPeer, peers: PeersInterface): Promise<boolean> {
    if (!this.node) {
      return false;
    }

    l.debug(() => `dialing ${peer.shortId}`);

    try {
      const connection = await promisify(
        this.node, this.node.dialProtocol, peer.peerInfo, this.protocol
      );

      peer.addConnection(connection, true);
      peers.log('dialled', peer);

      return true;
    } catch (error) {
      l.debug(() => `${peer.shortId} dial error ${error.message}`);
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

    if (peer && !this.dialQueue[peer.id]) {
      this.dialQueue[peer.id] = {
        nextDial: 0,
        peer
      };
    }

    if (!this.node || !this.node.isStarted()) {
      return;
    }

    const now = Date.now();

    Object.keys(this.dialQueue).forEach(
      async (id: string): Promise<void> => {
        const item = this.dialQueue[id];

        if (!this.peers || (item.nextDial > now) || item.peer.isActive()) {
          return;
        }

        item.nextDial = Date.now() + defaults.WAIT_TIMEOUT + Math.floor(Math.random() * defaults.WAIT_TIMEOUT);

        await this._dialPeer(item, this.peers);
      }
    );
  }

  private _requestAny (): void {
    if (this.peers) {
      this.peers.peers().forEach((peer) => {
        this.sync && this.sync.requestBlocks(peer);
      });
    }

    setTimeout(() => {
      this._requestAny();
    }, REQUEST_INTERVAL);
  }
}
