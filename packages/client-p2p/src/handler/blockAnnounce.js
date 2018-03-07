// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, PeerInterface } from '../types';
import type { BlockAnnounceMessage } from '../message/types';
import type { P2pState } from '../server/types';

const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

const message = require('../message/blockAnnounce');

module.exports = function handleBlockAnnounce (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => ['BlockAnnounce', JSON.stringify(message.encode().message)]);

  const header = (message.raw: BlockAnnounceMessage).header;

  if (peer.getBestNumber().lt(header.number)) {
    peer.setBest(header.number, blake2Asu8a256(
      encodeHeader(header)
    ));
  }
};

module.exports.TYPE = message.TYPE;
