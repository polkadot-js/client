// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow
/* eslint no-use-before-define:0 */

import type BN from 'bn.js';
import type { Config } from '@polkadot/client/types';
import type { ChainDb$Block, ChainDb$State } from '@polkadot/client-db-chain/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { Logger } from '@polkadot/util/types';

export type ChainName = 'demo' | 'nelson';
export type ChainType = 'polkadot' | 'substrate';

export type ChainConfig$Node = string;
export type ChainConfig$Nodes = Array<ChainConfig$Node>;

export type ChainConfig$Balances = Array<{
  accountId: Uint8Array,
  balance: BN
}>;

export type ChainConfig$Genesis$Block = {
  header: Uint8Array,
  hash: Uint8Array
};

export type ChainConfigLoose$Number = BN | number | string;

export type ChainConfigLoose$Params = {
  [string]: ChainConfigLoose$Number
};

export type ChainConfigLoose = {
  name: string,
  description: string,
  blockTime: ChainConfigLoose$Number,
  networkId: ChainConfigLoose$Number,
  type: ChainType,
  genesis: {
    authorities: Array<string>,
    balances: {
      [string]: ChainConfigLoose$Number
    },
    code: Uint8Array,
    params: ChainConfigLoose$Params,
    validators: Array<string>
  },
  nodes: ChainConfig$Nodes
};

export type ChainConfig$Genesis = {
  authorities: Array<Uint8Array>,
  balances: ChainConfig$Balances,
  block: ChainConfig$Genesis$Block,
  code: Uint8Array,
  codeHash: Uint8Array,
  params: {
    [string]: BN
  },
  validators: Array<Uint8Array>
};

export type ChainConfig = {
  blockTime: BN,
  code: Uint8Array,
  codeHash: Uint8Array,
  description: string,
  genesis: ChainConfig$Genesis,
  name: string,
  networkId: BN,
  nodes: ChainConfig$Nodes,
  type: ChainType
};

export type ChainInterface$Blocks = {
  getBlock: (hash: Uint8Array) => Uint8Array,
  getBestHash: () => Uint8Array,
  getBestNumber: () => BN,
  setBest: (number: BN | number, hash: Uint8Array) => void,
  setBlock: (hash: Uint8Array, block: Uint8Array) => void
};

export type ChainInterface$Executor$BlockImportResult = {
  body: Uint8Array,
  hash: Uint8Array,
  header: Uint8Array
};

export type ChainInterface$Executor = {
  executeBlock (block: Uint8Array): boolean,
  executeTransaction (header: Uint8Array, utx: Uint8Array): Uint8Array,
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
  config: ChainConfig,
  executor: ChainInterface$Executor,
  state: ChainInterface$StateDb
};

export type ChainState = {
  blockDb: ChainDb$Block,
  config: Config,
  chain: ChainConfig,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: ChainDb$State
};

export type ChainDefinition$Execute = {
  executor: (self: ChainState) => ChainInterface$Executor,
  genesis: (self: ChainState) => void
};

export type ChainDefinitionLoose = ChainDefinition$Execute & {
  config: ChainConfigLoose
};

export type ChainDefinition = ChainDefinition$Execute & {
  config: ChainConfig
};
