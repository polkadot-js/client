// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from './types';

const decodeHeader = require('@polkadot/primitives-codec/blockHeader/decode');

const announceMessage = require('../message/announce');

module.exports = function announceBlock (self: P2pState, header: Uint8Array): void {
  const message = announceMessage(
    decodeHeader(header)
  );

  self.peers.peers.forEach((peer) => {
    peer.send(message);
  });
};
