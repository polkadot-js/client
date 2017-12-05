// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pNodeType, P2pConfigType, P2pInterface, P2pOnErrorCallback } from './types';

const assert = require('@polkadot/util/assert');
const l = require('@polkadot/util/logger')('p2p');
const EventEmitter = require('eventemitter3');

const attachError = require('./attach/error');

module.exports = class P2p extends EventEmitter implements P2pInterface {
  constructor ({ port, privateKey }: P2pConfigType) {
    super();

    l.log('Started');
  }

  async addBootnodes (nodes: Array<P2pNodeType>): Promise<void> {
    assert(false, 'P2p:addBootnodes is not implemented');
  }

  async addPeers (nodes: Array<P2pNodeType>): Promise<void> {
    assert(false, 'P2p:addPeers is not implemented');
  }

  onError (handler: P2pOnErrorCallback): void {
    attachError(this, handler);
  }
};
