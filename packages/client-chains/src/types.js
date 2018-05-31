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

export type ChainConfig$Node = string;
export type ChainConfig$Nodes = Array<ChainConfig$Node>;

export type ChainConfig$Balances = Array<{
  accountId: Uint8Array,
  balance: BN
}>;

export type ChainGenesis = {
  header: Header,
  hash: Uint8Array
};

export type ChainConfig$Genesis = {
  consensus: {
    authorities: Array<Uint8Array>,
    code: Uint8Array
  },
  democracy: {
    launchPeriod: BN | number,
    minimumDeposit: BN | number,
    votingPeriod: BN | number
  },
  council: {
    activeCouncil: Array<{
      accountId: Uint8Array,
      duration: BN | number
    }>,
    candidacyBond: BN | number,
    carryCount: BN | number,
    desiredSeats: BN | number,
    inactiveGracePeriod: BN | number,
    presentationDuration: BN | number,
    presentSlashPerVoter: BN | number,
    termDuration: BN | number,
    votingBond: BN | number,
    // NOTE Rust approval_voting_period
    votingPeriod: BN | number
  },
  councilVoting: {
    // NOTE Rust has these in council as well
    cooloffPeriod: BN | number,
    votingPeriod: BN | number
  },
  session: {
    length: BN | number,
    validators: Array<Uint8Array>
  },
  staking: {
    balances: Array<{
      accountId: Uint8Array,
      balance: BN | number
    }>,
    bondingDuration: BN | number,
    currentEra: BN | number,
    intentions: Array<Uint8Array>,
    sessionsPerEra: BN | number,
    transactionFee: BN | number,
    validatorCount: BN | number
  }
};

export type ChainConfig = {
  blockTime: number,
  code: Uint8Array,
  codeHash: Uint8Array,
  description: string,
  genesis: ChainConfig$Genesis,
  name: string,
  networkId: number,
  nodes: ChainConfig$Nodes,
  type: ChainType
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
  genesis: ChainGenesis,
  state: ChainInterface$StateDb
};

export type ChainState = {
  blockDb: BlockDb,
  config: Config,
  chain: ChainConfig,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: StateDb
};

export type ChainDefinition = {
  config: ChainConfig,
  initExecutor: (self: ChainState) => ChainInterface$Executor,
  initGenesis: (self: ChainState) => ChainGenesis
};
