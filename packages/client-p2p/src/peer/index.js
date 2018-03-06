// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type PeerInfo from 'peer-info';
import type { MessageInterface, PeerInterface } from '../types';
import type { PeerState } from './types';

const BN = require('bn.js');
const EventEmitter = require('eventemitter3');
const pushable = require('pull-pushable');

const stringShorten = require('@polkadot/util/string/shorten');

const addConnection = require('./addConnection');
const emitterOn = require('./emitterOn');
const send = require('./send');

module.exports = function createPeer (peerInfo: PeerInfo): PeerInterface {
  const id = peerInfo.id.toB58String();
  const self: PeerState = {
    bestHash: new Uint8Array([]),
    bestNumber: new BN(0),
    connections: [],
    emitter: new EventEmitter(),
    pushable: pushable()
  };

  return {
    id,
    peerInfo,
    shortId: stringShorten(id),
    addConnection: (connection: LibP2P$Connection): boolean =>
      addConnection(self, connection),
    getBestHash: (): Uint8Array =>
      self.bestHash,
    getBestNumber: (): BN =>
      self.bestNumber,
    on: emitterOn(self),
    send: (message: MessageInterface): boolean =>
      send(self, message)
  };
};
