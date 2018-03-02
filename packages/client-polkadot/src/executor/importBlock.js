// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotState } from '../types';

const decodeHeader = require('@polkadot/primitives-codec/blockHeader/decodePartial');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

const executeBlock = require('./executeBlock');

module.exports = function importBlock (self: PolkadotState, block: Uint8Array): boolean {
  const result = executeBlock(self, block);

  if (!result) {
    return false;
  }

  self.stateDb.commit();

  const { header: { number }, raw } = decodeHeader(block);
  const hash = blake2Asu8a256(raw);

  console.log('decoded', raw, hash);

  self.blockDb.setBlock(hash, block);
  self.blockDb.setLatest(number, hash);

  return true;
};
