// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockAnnounceMessage } from '../message/types';
import type { MessageInterface } from '../types';
import type { PeerState } from './types';

const encodeHeader = require('@polkadot/primitives-codec/blockHeader/encode');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

module.exports = function receiveBlockAnnounce (self: PeerState, message: MessageInterface): void {
  const header = (message.raw: BlockAnnounceMessage).header;

  if (self.bestNumber.lt(header.number)) {
    self.bestNumber = header.number;
    self.bestHash = blake2Asu8a256(
      encodeHeader(header)
    );
  }
};
