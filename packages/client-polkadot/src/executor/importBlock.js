// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface$Executor$BlockImportResult } from '@polkadot/client-chains/types';
import type { PolkadotState } from '../types';

const decodeRaw = require('@polkadot/primitives-codec/block/decodeRaw');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

const executeBlock = require('./executeBlock');

module.exports = function importBlock (self: PolkadotState, block: Uint8Array): ?ChainInterface$Executor$BlockImportResult {
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

  // console.log('decoded', raw, hash);

  self.blockDb.setBlock(hash, block);
  self.blockDb.setBest(number, hash);

  self.l.log(`Imported block #${number.toString()} (${Date.now() - start}ms)`);

  return {
    body,
    hash,
    header
  };
};
