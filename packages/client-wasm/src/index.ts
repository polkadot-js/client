// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainGenesis } from '@polkadot/client-chains/types';
import { BlockDb, StateDb } from '@polkadot/client-db-chain/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import { ExecutorState, ExecutorInterface, Executor$BlockImportResult } from './types';

import logger from '@polkadot/util/logger';

import applyExtrinsic from './executor/applyExtrinsic';
import executeBlock from './executor/executeBlock';
import finaliseBlock from './executor/finaliseBlock';
import generateBlock from './executor/generateBlock';
import importBlock from './executor/importBlock';
import initialiseBlock from './executor/initialiseBlock';

const l = logger('executor');

export default function executor (config: Config, blockDb: BlockDb, stateDb: StateDb, runtime: RuntimeInterface): ExecutorInterface {
  const self: ExecutorState = {
    blockDb,
    config,
    l,
    runtime,
    stateDb
  };

  return {
    applyExtrinsic: (extrinsic: UncheckedRaw): boolean =>
      applyExtrinsic(self, extrinsic),
    executeBlock: (block: Uint8Array): boolean =>
      executeBlock(self, block),
    finaliseBlock: (header: Uint8Array): Uint8Array =>
      finaliseBlock(self, header),
    generateBlock: (utxs: Array<UncheckedRaw>, timestamp: number = Math.ceil(Date.now() / 1000)): Uint8Array =>
      generateBlock(self, utxs, timestamp),
    importBlock: (block: Uint8Array): Executor$BlockImportResult =>
      importBlock(self, block),
    initialiseBlock: (header: Uint8Array): boolean =>
      initialiseBlock(self, header)
  };
}
