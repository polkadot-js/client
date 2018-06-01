// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow
/* eslint no-use-before-define:0 */

import type BN from 'bn.js';
import type { Config } from '@polkadot/client/types';
import type { BlockDb } from '@polkadot/client-db-chain/block/types';
import type { StateDb } from '@polkadot/client-db-chain/state/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { Header } from '@polkadot/primitives/header';
import type { Logger } from '@polkadot/util/types';

export type ChainName = 'dev';
export type ChainType = 'polkadot' | 'substrate';

export type ChainGenesisState = {
  [string]: string
};

export type ChainGenesis = {
  code: Uint8Array,
  codeHash: Uint8Array,
  header: Header,
  headerHash: Uint8Array
};

export type ChainInterface$Blocks = {
  getBestHash: () => Uint8Array,
  getBestNumber: () => BN,
  getBlock: (hash: Uint8Array) => Uint8Array
};

export type ChainInterface$Executor$BlockImportResult = {
  body: Uint8Array,
  hash: Uint8Array,
  header: Uint8Array
};

export type ChainInterface$Executor = {
  applyExtrinsic (header: Uint8Array, utx: Uint8Array): Uint8Array,
  executeBlock (block: Uint8Array): boolean,
  finaliseBlock (header: Uint8Array): Uint8Array,
  generateBlock (number: BN | number, transactions: Array<Uint8Array>): Uint8Array,
  importBlock (block: Uint8Array): ?ChainInterface$Executor$BlockImportResult
};

export type ChainInterface$StateDb = {
  getBlockHash: (number: BN | number) => Uint8Array,
  getNonce: (publicKey: Uint8Array) => BN
};

export type ChainInterface = {
  blocks: ChainInterface$Blocks,
  executor: ChainInterface$Executor,
  genesis: ChainGenesis,
  state: ChainInterface$StateDb
};

export type ChainState = {
  blockDb: BlockDb,
  config: Config,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: StateDb
};
