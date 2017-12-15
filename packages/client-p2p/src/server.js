// ISC, Copyright 2017 Jaco Greeff
// @flow

import type Libp2p from 'libp2p';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { MessageInterface, P2pConfigType, P2pInterface, PeerType } from './types';

const EventEmitter = require('eventemitter3');
const pull = require('pull-stream');

const assert = require('@polkadot/util/assert');
const isObject = require('@polkadot/util/is/object');
const promisify = require('@polkadot/util/promisify');
const l = require('@polkadot/util/logger')('p2p');

const Peers = require('./peers');
const createNode = require('./create/node');
const StatusMessage = require('./message/status');
const rlpEncode = require('./rlp/encode');
const defaults = require('./defaults');

module.exports = class Server extends EventEmitter implements P2pInterface {
  _config: P2pConfigType;
  _chain: ChainConfigType;
  _node: Libp2p;
  _peers: Peers;

  constructor (config: P2pConfigType, chain: ChainConfigType, autoStart: boolean = true) {
    super();

    assert(isObject(config), 'Expected P2P configuration');
    assert(isObject(chain), 'Expected chain definition');

    this._config = config;
    this._chain = chain;

    if (autoStart) {
      this.start();
    }
  }

  get peers (): Peers {
    return this._peers;
  }

  async start (): Promise<void> {
    this.stop();

    this._node = await createNode(this._config, this._chain);
    this._node.handle(defaults.PROTOCOL, this._receive);

    this._peers = new Peers(this._node);
    this._peers.on('discovered', this._dialPeer);

    await promisify(this._node, this._node.start);

    l.log(`Started on address=${this._config.address}, port=${this._config.port}`);
    this.emit('started');
  }

  async stop (): Promise<void> {
    if (!this._node) {
      return;
    }

    const node = this._node;

    // $FlowFixMe setting the _node to ?Libp2p above doesn't do the trick, it complains in start - something funky going on in the start() method
    this._node = null;

    // $FlowFixMe same...
    this._peers = null;

    await promisify(node, node.stop);

    l.log('Server stopped');
    this.emit('stopped');
  }

  _dialPeer = async (peer: PeerType): any => {
    if (!peer || peer.isConnecting) {
      return;
    }

    peer.isConnecting = true;
    peer.isConnected = false;

    try {
      peer.connection = await promisify(this._node, this._node.dial, peer.peerInfo, defaults.PROTOCOL);

      this._send(peer.connection, new StatusMessage());
    } catch (error) {
      peer.isConnecting = false;
    }
  }

  _send = (connection: any, message: MessageInterface): void => {
    const encoded = rlpEncode(message);
    const streamWriter = pull.values([
      encoded
    ]);

    console.log('W', encoded);

    pull(
      streamWriter,
      connection
    );
  }

  _receive = (protocol: string, connection: any): void => {
    assert(protocol === defaults.PROTOCOL, `Expected matching protocol, '${protocol}' received`);

    const streamReader = (read: Function): void => {
      const next = (end: Error | boolean, encoded: Buffer): void => {
        if (end) {
          if (end === true) {
            return;
          }

          throw end;
        }

        console.log('R', encoded);

        read(null, next);
      };

      read(null, next);
    };

    pull(
      connection,
      streamReader
    );
  }
};
