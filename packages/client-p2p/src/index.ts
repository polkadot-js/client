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

interface OnMessage {
  peer: PeerInterface;
  message: MessageInterface;
}

interface QueuedPeer {
  peer: PeerInterface;
  nextDial: number;
  numDials: number;
}

const DIAL_INTERVAL = 15000;
const REQUEST_INTERVAL = 15000;

const l = logger('p2p');

export default class P2p extends EventEmitter implements P2pInterface {
  public readonly chain: ChainInterface;

  public readonly config: Config;

  public readonly l: Logger;

  private dialQueue: Map<string, QueuedPeer> = new Map();

  private node: LibP2p | undefined;

  private peers: PeersInterface | undefined;

  private protocol: string;

  private dialTimer: NodeJS.Timer | null;

  public readonly sync: Sync;

  public constructor (config: Config, chain: ChainInterface) {
    super();

    this.config = config;
    this.chain = chain;
    this.l = l;
    this.dialTimer = null;
    this.protocol = defaults.getProtocol(chain.chain.protocolId);
    this.sync = new Sync(this.config, this.chain);
  }

  public isStarted (): boolean {
    return !!this.node;
  }

  public getNumPeers (): number {
    return this.peers
      ? this.peers.count()
      : 0;
  }

  public async start (): Promise<boolean> {
    await this.stop();

    this.node = await createNode(this.config, this.chain, l);
    this.peers = new Peers(this.config, this.chain, this.node);
    this.sync.setPeers(this.peers);

    this._handleProtocol(this.node, this.peers);
    this._handlePing(this.node);
    this._onPeerDiscovery(this.node, this.peers);
    this._onPeerMessage(this.node, this.peers);

    await this.node.start();

    l.log(`Started with bootnodes ${this.config.p2p.discoverBoot ? 'en' : 'dis'}abled & star ${this.config.p2p.discoverStar ? 'en' : 'dis '}abled`);
    this.emit('started');

    this._requestAny();

    return true;
  }

  public async stop (): Promise<boolean> {
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
      this.peers.peers().forEach((peer): void => {
        peer.disconnect();
      });
    }

    const node = this.node;

    delete this.node;
    delete this.peers;

    await node.stop();

    l.log('Server stopped');
    this.emit('stopped');

    return true;
  }

  private _onPeerDiscovery (node: LibP2p, peers: PeersInterface): void {
    node.on('start', (): void =>
      this._dialPeers()
    );

    peers.on('discovered', (peer: PeerInterface): void => {
      this._dialPeers(peer);
    });
  }

  private _onPeerMessage (node: LibP2p, peers: PeersInterface): void {
    peers.on('message', ({ peer, message }: OnMessage): void => {
      const handler = handlers.find(({ type }): boolean =>
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
          // eslint-disable-next-line @typescript-eslint/unbound-method
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
      // eslint-disable-next-line @typescript-eslint/require-await
      async (protocol: string, connection: LibP2pConnection): Promise<void> => {
        try {
          const stream = handshake({ timeout: defaults.WAIT_TIMEOUT });
          const shake = stream.handshake;
          const next = (): void => {
            shake.read(defaults.PING_LENGTH, (error, buffer): void => {
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

    l.debug((): string => `dialing ${peer.shortId}`);

    try {
      // const connection = await this.node.dialProtocol(peer.peerInfo, this.protocol);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const connection = await promisify(this.node, this.node.dialProtocol, peer.peerInfo, this.protocol);

      peer.addConnection(connection, true);
      peers.log('dialled', peer);

      return true;
    } catch (error) {
      l.debug((): string => `${peer.shortId} dial error ${error.message}`);
    }

    return false;
  }

  private _dialPeers (peer?: PeerInterface): void {
    if (this.dialTimer !== null) {
      clearTimeout(this.dialTimer);

      this.dialTimer = null;
    }

    this.dialTimer = setTimeout((): void => {
      this._dialPeers();
    }, DIAL_INTERVAL);

    if (peer && !this.dialQueue.get(peer.id)) {
      this.dialQueue.set(peer.id, {
        nextDial: 0,
        numDials: 1,
        peer
      });
    }

    if (!this.node || !this.node.isStarted()) {
      return;
    }

    const now = Date.now();

    this.dialQueue.forEach((item): void => {
      if (!this.peers || (item.nextDial > now) || item.peer.isActive()) {
        return;
      }

      const delay = defaults.WAIT_TIMEOUT + Math.floor(Math.random() * defaults.WAIT_TIMEOUT);

      item.nextDial = Date.now() + (delay * item.numDials);
      item.numDials = item.numDials + 1;

      // TODO We really want to reset (when all ok and we have the status)
      this._dialPeer(item, this.peers).catch((): void => {});
    });
  }

  private _requestAny (): void {
    if (this.peers) {
      this.peers.peers().forEach((peer): void => {
        this.sync && this.sync.requestBlocks(peer);
      });
    }

    setTimeout((): void => {
      this._requestAny();
    }, REQUEST_INTERVAL);
  }
}
