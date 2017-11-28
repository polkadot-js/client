// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pNodeType, P2pConfigType, P2pInterface, P2pOnErrorCallback } from '../types';

const EventEmitter = require('eventemitter3');

const l = require('@polkadot/util/logger')('libp2p');

const NOT_IMPLEMENTED = 'LibP2p interface has not been implemented as of POC-1';

module.exports = class LibP2p extends EventEmitter implements P2pInterface {
  constructor ({ port, privateKey }: P2pConfigType) {
    super();

    l.error(NOT_IMPLEMENTED);

    throw new Error(NOT_IMPLEMENTED);
  }

  addBootnodes (bootnodes: Array<P2pNodeType>): Promise<void> {
  }

  onError (handler: P2pOnErrorCallback): void {
  }
};
