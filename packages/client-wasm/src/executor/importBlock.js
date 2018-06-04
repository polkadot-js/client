// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExecutorState, Executor$BlockImportResult } from '../types';

const decodeRaw = require('@polkadot/primitives-codec/block/decodeRaw');
const blake2Asu8a = require('@polkadot/util-crypto/blake2/asU8a');

const executeBlock = require('./executeBlock');

module.exports = function importBlock (self: ExecutorState, block: Uint8Array): Executor$BlockImportResult {
  const start = Date.now();

  self.l.debug(() => 'Importing block');

  executeBlock(self, block);

  self.stateDb.db.commit();

  const { body, extrinsics, header, number } = decodeRaw(block);
  const headerHash = blake2Asu8a(header, 256);

  // FIXME should be removed once block generation goes away
  self.stateDb.system.blockHashAt.set(headerHash, number);

  self.blockDb.bestHash.set(headerHash);
  self.blockDb.bestNumber.set(number);
  self.blockDb.block.set(block, headerHash);

  self.l.debug(() => `Imported block #${number.toString()} (${Date.now() - start}ms)`);

  return {
    body,
    extrinsics,
    headerHash,
    header
  };
};
