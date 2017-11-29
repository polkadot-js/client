// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { EjsDevP2pCapability, EjsDevP2pCapability$Status, EjsDevP2pRlpx$Capability, EjsDevP2pRlpx$Node } from 'ethereumjs-devp2p';

const numberToBuffer = require('@polkadot/util/number/toBuffer');
const EthDevP2p = require('ethereumjs-devp2p');

const ProtocolBase = require('./base');

class DevP2pImpl extends ProtocolBase implements EjsDevP2pCapability {
  _peer: EjsDevP2pRlpx$Node;
  _version: number;

  constructor (version: number, peer: EjsDevP2pRlpx$Node, send: (code: number, payload: Buffer) => void) {
    super(send);

    this._peer = peer;
    this._version = version;
  }

  getVersion (): number {
    return this._version;
  }

  _handleMessage (code: number, data: Buffer): any {
    super.receive(code, data);
  }

  sendStatus ({ bestHash, genesisHash, networkId, td }: EjsDevP2pCapability$Status): any {
    super.send(
      EthDevP2p.ETH.MESSAGE_CODES.STATUS,
      [
        numberToBuffer(this._version),
        numberToBuffer(networkId),
        td,
        bestHash,
        genesisHash
      ]
    );
  }

  sendMessage (code: number, payload: Array<Buffer>): any {
    super.send(code, payload);
  }

  static dot00: EjsDevP2pRlpx$Capability = {
    name: 'dot',
    version: 0,
    length: 0, // ???
    constructor: DevP2pImpl
  };
}

module.exports = DevP2pImpl;
