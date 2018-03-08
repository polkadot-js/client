// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage$Fields, BlockResponseMessage$BlockData } from '../message/types';
import type { P2pState } from '../types';

const decodeBlock = require('@polkadot/primitives-codec/block/decodeRaw');

module.exports = function getBlockData (self: P2pState, fields: BlockRequestMessage$Fields, hash: Uint8Array): BlockResponseMessage$BlockData {
  const { body, header } = decodeBlock(
    self.chain.blocks.getBlock(hash)
  );
  const data: BlockResponseMessage$BlockData = {
    hash
  };

  if (fields.includes('body')) {
    data.header = header;
  }

  if (fields.includes('header')) {
    data.body = body;
  }

  return data;
};
