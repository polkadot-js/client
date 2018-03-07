// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

// import type { BlockRequestMessage } from '../../message/types';
import type { MessageInterface, PeerInterface } from '../types';
import type { P2pState } from '../server/types';

// const encodeHeader = require('@polkadot/primitives-codec/header/encode');
// const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

const message = require('../message/blockRequest');

module.exports = function handleBlockRequest (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'BlockRequest', JSON.stringify(message.encode().message)]);

  // const header = (message.raw: BlockRequestMessage).header;
  //
  // if (self.bestNumber.lt(header.number)) {
  //   self.bestNumber = header.number;
  //   self.bestHash = blake2Asu8a256(
  //     encodeHeader(header)
  //   );
  // }
};

module.exports.TYPE = message.TYPE;
