// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type ChainConfig$Node = string;
export type ChainConfig$Nodes = Array<ChainConfig$Node>;

export type ChainConfig$Balances = Array<{
  accountId: Uint8Array,
  balance: BN
}>;

export type ChainConfig$Genesis = {
  author: Uint8Array,
  hash: Uint8Array,
  stateRoot: Uint8Array
};

export type ChainConfig$Params = {
  approvalRatio: BN,
  blockTime: BN,
  bondingDuration: BN,
  networkId: BN,
  sessionLength: BN,
  sessionsPerEra: BN
};

export type ChainConfig$Number = BN | number | string;

export type ChainConfig$s = 'polkadot';

export type ChainConfigLoose = {
  authorities: Array<string>,
  balances: {
    [string]: ChainConfig$Number
  },
  code: Uint8Array,
  description: string,
  name: string,
  nodes: ChainConfig$Nodes,
  params: {
    approvalRatio: ChainConfig$Number,
    blockTime: ChainConfig$Number,
    bondingDuration: ChainConfig$Number,
    networkId: ChainConfig$Number,
    sessionLength: ChainConfig$Number,
    sessionsPerEra: ChainConfig$Number
  },
  type: ChainConfig$s,
  validators: Array<string>
};

export type ChainConfig = {
  authorities: Array<Uint8Array>,
  balances: ChainConfig$Balances,
  code: Uint8Array,
  description: string,
  genesis: ChainConfig$Genesis,
  name: string,
  nodes: ChainConfig$Nodes,
  params: ChainConfig$Params,
  type: ChainConfig$s,
  validators: Array<Uint8Array>
};

export type ChainName = 'nelson';

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
  generateBlock (number: number, transactions: Array<Uint8Array>): Uint8Array,
  importBlock (block: Uint8Array): ?ChainInterface$Executor$BlockImportResult
};

export type ChainInterface$Genesis = {
  header: Uint8Array,
  hash: Uint8Array
};

export type ChainInterface$StateDb = {
  getBlockHash: (number: BN | number) => Uint8Array,
  getNonce: (publicKey: Uint8Array) => BN
};

export type ChainInterface = {
  blocks: ChainInterface$Blocks,
  config: ChainConfig,
  executor: ChainInterface$Executor,
  genesis: ChainInterface$Genesis,
  state: ChainInterface$StateDb
};
