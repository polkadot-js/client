// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ChainState, ChainInterface$Executor, ChainInterface$Executor$BlockImportResult } from '../types';

const applyExtrinsic = require('./applyExtrinsic');
const executeBlock = require('./executeBlock');
const finaliseBlock = require('./finaliseBlock');
const generateBlock = require('./generateBlock');
const importBlock = require('./importBlock');

module.exports = function executor (self: ChainState): ChainInterface$Executor {
  return {
    executeBlock: (block: Uint8Array): boolean =>
      executeBlock(self, block),
    applyExtrinsic: (header: Uint8Array, utx: Uint8Array): Uint8Array =>
      applyExtrinsic(self, header, utx),
    finaliseBlock: (header: Uint8Array): Uint8Array =>
      finaliseBlock(self, header),
    generateBlock: (number: BN | number, utxs: Array<Uint8Array>, timestamp?: number = Date.now()): Uint8Array =>
      generateBlock(self, number, utxs, timestamp),
    importBlock: (block: Uint8Array): ?ChainInterface$Executor$BlockImportResult =>
      importBlock(self, block)
  };
};
