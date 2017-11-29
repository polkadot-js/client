// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pNodeType, P2pConfigType, P2pInterface, P2pOnErrorCallback } from '../types';

const l = require('@polkadot/util/logger')('devp2p');
const EthDevP2p = require('ethereumjs-devp2p');
const EventEmitter = require('eventemitter3');

const createDpt = require('./create/dpt');
const createRlpx = require('./create/rlpx');
const attachError = require('../attach/error');

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

  async addBootnodes (nodes: Array<P2pNodeType>): Promise<void> {
    nodes.forEach(async ({ address, port }) => {
      try {
        await this._dpt.bootstrap({
          address,
          tcpPort: port,
          udpPort: port
        });
      } catch (error) {
        this.emit('discover.error.bootnode', error);
      }
    });
  }

  async addPeers (nodes: Array<P2pNodeType>): Promise<void> {
    nodes.forEach(async ({ address, port }) => {
      try {
        const { id } = await this._dpt.addPeer({
          address,
          tcpPort: port,
          udpPort: port
        });

        try {
          // address: peer.address,
          // port: peer.tcpPort
          await this._rlpx.connect({
            address,
            id,
            port
          });
        } catch (error) {
          this.emit('comms.error.peer', error);
        }
      } catch (error) {
        this.emit('discover.error.peer', error);
      }
    });
  }

  onError (handler: P2pOnErrorCallback): void {
    attachError(this, handler);
  }
};
