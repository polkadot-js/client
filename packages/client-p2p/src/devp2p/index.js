// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pNodeType, P2pConfigType, P2pInterface, P2pOnErrorCallback } from '../types';

const l = require('@polkadot/util/logger')('devp2p');
const EthDevP2p = require('ethereumjs-devp2p');
const EventEmitter = require('eventemitter3');

const createDpt = require('./create/dpt');
const createRlpx = require('./create/rlpx');

module.exports = class DevP2p extends EventEmitter implements P2pInterface {
  _dpt: EthDevP2p.DPT;
  _rlpx: EthDevP2p.RLPx;

  constructor (config: P2pConfigType) {
    super();

    l.log('Initialising');

    const emit = (...params: Array<any>) => this.emit.apply(this, params);

    this._dpt = createDpt(config, emit);
    this._rlpx = createRlpx(config, this._dpt, emit);
  }

  async addBootnodes (bootnodes: Array<P2pNodeType>): Promise<void> {
    bootnodes.forEach(async ({ address, port }) => {
      try {
        await this._dpt.bootstrap({
          address,
          tcpPort: port,
          udpPort: port
        });
      } catch (error) {
        this.emit('bootnode.error', error);
      }
    });
  }

  onError (handler: P2pOnErrorCallback): void {
    const onWrapper = (type: string) => {
      this.on(type, (error: Error): void => handler({
        message: error.message,
        type
      }));
    };

    onWrapper('bootnode.error');
    onWrapper('discover.error');
    onWrapper('comms.error');
  }
};
