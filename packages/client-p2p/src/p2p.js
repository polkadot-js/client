// ISC, Copyright 2017 Jaco Greeff
// @flow

import type Libp2p from 'libp2p';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { P2pConfigType, P2pInterface, P2pOnErrorCallback } from './types';

const assert = require('@polkadot/util/assert');
const isObject = require('@polkadot/util/is/object');
const l = require('@polkadot/util/logger')('p2p');
const EventEmitter = require('eventemitter3');

const attachError = require('./attach/error');
const createNode = require('./create/node');

module.exports = class P2p extends EventEmitter implements P2pInterface {
  _config: P2pConfigType;
  _chain: ChainConfigType;
  _node: Libp2p;

  // TODO: Save peers, pass through valid PeerBook for known nodes as part of the setup process (could also specify these on the commandline)
  constructor (config: P2pConfigType, chain: ChainConfigType, autoStart: boolean = true) {
    super();

    assert(isObject(config), 'Expected a P2P configuration object');

    assert(isObject(chain), 'Expected a chain definition object');

    this._config = config;
    this._chain = chain;

    if (autoStart) {
      this.start();
    }
  }

  async start (): Promise<void> {
    this._node = await createNode(this._config, this._chain);

    l.log('Started');
  }

  onError (handler: P2pOnErrorCallback): void {
    attachError(this, handler);
  }
};
