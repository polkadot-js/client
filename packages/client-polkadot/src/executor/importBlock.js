// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotState } from '../types';

type ImportResult = {
  body: Uint8Array,
  hash: Uint8Array,
  header: Uint8Array
};

const decodeHeader = require('@polkadot/primitives-codec/blockHeader/decodePartial');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

const executeBlock = require('./executeBlock');

module.exports = function importBlock (self: PolkadotState, block: Uint8Array): ?ImportResult {
  // self.l.log('Importing block');

  const start = Date.now();
  const result = executeBlock(self, block);

  if (!result) {
    self.l.error(`Block import failed (${Date.now() - start}ms elapsed)`);
    return null;
  }

  self.stateDb.commit();

  const { header: { number }, raw, remainder } = decodeHeader(block);
  const hash = blake2Asu8a256(raw);

  // console.log('decoded', raw, hash);

  self.blockDb.setBlock(hash, block);
  self.blockDb.setLatest(number, hash);

  self.l.log(`Imported block ${number.toNumber()} (${Date.now() - start}ms elapsed)`);

  return {
    body: remainder,
    hash,
    header: raw
  };
};
