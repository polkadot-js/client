// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ChainGenesis, ChainState, ChainInterface$Executor, ChainInterface$Executor$BlockImportResult } from '../types';

const applyExtrinsic = require('./applyExtrinsic');
const executeBlock = require('./executeBlock');
const finaliseBlock = require('./finaliseBlock');
const generateBlock = require('./generateBlock');
const importBlock = require('./importBlock');
const initialiseBlock = require('./initialiseBlock');

module.exports = function executor (self: ChainState, { code }: ChainGenesis): ChainInterface$Executor {
  return {
    applyExtrinsic: (header: Uint8Array, utx: Uint8Array): Uint8Array =>
      applyExtrinsic(self, code, header, utx),
    executeBlock: (block: Uint8Array): boolean =>
      executeBlock(self, code, block),
    finaliseBlock: (header: Uint8Array): Uint8Array =>
      finaliseBlock(self, code, header),
    generateBlock: (number: BN | number, utxs: Array<Uint8Array>, timestamp?: number = Date.now()): Uint8Array =>
      generateBlock(self, code, number, utxs, timestamp),
    importBlock: (block: Uint8Array): ?ChainInterface$Executor$BlockImportResult =>
      importBlock(self, code, block),
    initialiseBlock: (header: Uint8Array): Uint8Array =>
      initialiseBlock(self, code, header)
  };
};
