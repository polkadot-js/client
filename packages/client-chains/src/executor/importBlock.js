// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState, ChainInterface$Executor$BlockImportResult } from '../types';

const decodeRaw = require('@polkadot/primitives-codec/block/decodeRaw');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

const executeBlock = require('./executeBlock');

module.exports = function importBlock (self: ChainState, block: Uint8Array): ?ChainInterface$Executor$BlockImportResult {
  self.l.debug(() => 'Importing block');

  const start = Date.now();
  const result = executeBlock(self, block);

  if (!result) {
    self.l.error(`Block import failed (${Date.now() - start}ms elapsed)`);
    return null;
  }

  self.stateDb.commit();

  const { body, header, number } = decodeRaw(block);
  const hash = blake2Asu8a256(header);

  self.blockDb.bestHash.set(hash);
  self.blockDb.bestNumber.set(number);
  self.blockDb.block.set(block, hash);

  self.l.debug(() => `Imported block #${number.toString()} (${Date.now() - start}ms)`);

  return {
    body,
    hash,
    header
  };
};
