// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { BlockDb, StateDb } from '@polkadot/client-db-chain/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { ExecutorInterface } from '@polkadot/client-wasm/types';
import type { Header } from '@polkadot/primitives/header';
import type { Logger } from '@polkadot/util/types';

export type ChainName = 'dev';
export type ChainType = 'polkadot' | 'substrate';

export type ChainGenesisState = {
  [string]: string
};

export type ChainGenesis = {
  block: Uint8Array,
  code: Uint8Array,
  codeHash: Uint8Array,
  header: Header,
  headerHash: Uint8Array
};

export type ChainInterface = {
  blocks: BlockDb,
  executor: ExecutorInterface,
  genesis: ChainGenesis,
  state: StateDb
};

export type ChainState = {
  blockDb: BlockDb,
  config: Config,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: StateDb
};
