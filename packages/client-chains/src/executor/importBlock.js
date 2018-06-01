// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState, ChainInterface$Executor$BlockImportResult } from '../types';

const decodeRaw = require('@polkadot/primitives-codec/block/decodeRaw');
const blake2Asu8a = require('@polkadot/util-crypto/blake2/asU8a');

const executeBlock = require('./executeBlock');

module.exports = function importBlock (self: ChainState, code: Uint8Array, block: Uint8Array): ?ChainInterface$Executor$BlockImportResult {
  self.l.debug(() => 'Importing block');

  const start = Date.now();
  const result = executeBlock(self, code, block);

  if (!result) {
    self.l.error(`Block import failed (${Date.now() - start}ms elapsed)`);
    return null;
  }

  self.stateDb.db.commit();

  const { body, header, number } = decodeRaw(block);
  const hash = blake2Asu8a(header, 256);

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
