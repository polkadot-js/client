// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface$Executor } from '@polkadot/client-chains/types';
import type { PolkadotState } from '../types';

const executeBlock = require('./executeBlock');
const executeTransaction = require('./executeTransaction');
const finaliseBlock = require('./finaliseBlock');
const generateBlock = require('./generateBlock');
const importBlock = require('./importBlock');

module.exports = function executor (self: PolkadotState): ChainInterface$Executor {
  return {
    executeBlock: (block: Uint8Array): boolean =>
      executeBlock(self, block),
    executeTransaction: (header: Uint8Array, utx: Uint8Array): Uint8Array =>
      executeTransaction(self, header, utx),
    finaliseBlock: (header: Uint8Array): Uint8Array =>
      finaliseBlock(self, header),
    generateBlock: (number: number, utxs: Array<Uint8Array>, timestamp?: number = Date.now()): Uint8Array =>
      generateBlock(self, number, utxs, timestamp),
    importBlock: (block: Uint8Array): boolean =>
      importBlock(self, block)
  };
};
