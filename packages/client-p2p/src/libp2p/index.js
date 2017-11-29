// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pNodeType, P2pConfigType, P2pInterface, P2pOnErrorCallback } from '../types';

// const l = require('@polkadot/util/logger')('libp2p');
const EventEmitter = require('eventemitter3');

const attachError = require('../attach/error');

module.exports = class LibP2p extends EventEmitter implements P2pInterface {
  constructor ({ port, privateKey }: P2pConfigType) {
    super();

    throw new Error('LibP2p interface has not been implemented as of POC-1');
  }

  async addBootnodes (nodes: Array<P2pNodeType>): Promise<void> {
    throw new Error('LilP2p:addBootnodes is not implemented');
  }

  async addPeers (nodes: Array<P2pNodeType>): Promise<void> {
    throw new Error('LilP2p:addPeers is not implemented');
  }

  onError (handler: P2pOnErrorCallback): void {
    attachError(this, handler);
  }
};
