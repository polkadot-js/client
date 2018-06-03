// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Config } from '@polkadot/client/types';
import type { BlockDb, StateDb } from '@polkadot/client-db-chain/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { ExecutorState, ExecutorInterface, Executor$BlockImportResult } from './types';

const l = require('@polkadot/util/logger')('executor');

const applyExtrinsic = require('./executor/applyExtrinsic');
const executeBlock = require('./executor/executeBlock');
const finaliseBlock = require('./executor/finaliseBlock');
const generateBlock = require('./executor/generateBlock');
const importBlock = require('./executor/importBlock');
const initialiseBlock = require('./executor/initialiseBlock');

module.exports = function executor (config: Config, blockDb: BlockDb, stateDb: StateDb, runtime: RuntimeInterface): ExecutorInterface {
  const self: ExecutorState = {
    blockDb,
    config,
    l,
    runtime,
    stateDb
  };

  return {
    applyExtrinsic: (extrinsic: Uint8Array): Uint8Array =>
      applyExtrinsic(self, extrinsic),
    executeBlock: (block: Uint8Array): boolean =>
      executeBlock(self, block),
    finaliseBlock: (header: Uint8Array): Uint8Array =>
      finaliseBlock(self, header),
    generateBlock: (number: BN | number, utxs: Array<Uint8Array>, timestamp?: number = Math.ceil(Date.now() / 1000)): Uint8Array =>
      generateBlock(self, number, utxs, timestamp),
    importBlock: (block: Uint8Array): ?Executor$BlockImportResult =>
      importBlock(self, block),
    initialiseBlock: (header: Uint8Array): Uint8Array =>
      initialiseBlock(self, header)
  };
};
