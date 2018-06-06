// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { LibP2P$Connection } from 'libp2p';
import type PeerInfo from 'peer-info';
import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { MessageInterface, PeerInterface } from '../types';

const stringShorten = require('@polkadot/util/string/shorten');

const addConnection = require('./addConnection');
const emitterOn = require('./emitterOn');
const send = require('./send');
const setBest = require('./setBest');
const state = require('./state');

module.exports = function createPeer (config: Config, chain: ChainInterface, peerInfo: PeerInfo): PeerInterface {
  const id = peerInfo.id.toB58String();
  const self = state(config, chain);

  return {
    id,
    peerInfo,
    shortId: stringShorten(id),
    addConnection: (connection: LibP2P$Connection, isWritable: boolean): void =>
      addConnection(self, connection, isWritable),
    isWritable: (): boolean =>
      self.connections.find(({ isConnected, pushable }) =>
        isConnected && pushable !== undefined
      ) !== undefined,
    getBestHash: (): Uint8Array =>
      self.bestHash,
    getBestNumber: (): BN =>
      self.bestNumber,
    getNextId: (): number =>
      ++self.nextId,
    on: emitterOn(self),
    send: (message: MessageInterface): boolean =>
      send(self, message),
    setBest: (number: BN, hash: Uint8Array): void =>
      setBest(self, number, hash)
  };
};
