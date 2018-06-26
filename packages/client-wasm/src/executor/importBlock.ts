// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ExecutorState, Executor$BlockImportResult } from '../types';

import decodeRaw from '@polkadot/primitives-codec/block/decodeRaw';
import blake2Asu8a from '@polkadot/util-crypto/blake2/asU8a';

import executeBlock from './executeBlock';

export default function importBlock (self: ExecutorState, block: Uint8Array): Executor$BlockImportResult {
  const start = Date.now();

  self.l.debug(() => 'Importing block');

  executeBlock(self, block);

  self.stateDb.db.commit();

  const { body, extrinsics, header, number } = decodeRaw(block);
  const headerHash = blake2Asu8a(header, 256);

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
}
