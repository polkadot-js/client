// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb } from '@polkadot/client-db-chain/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { ExecutorInterface } from '@polkadot/client-wasm/types';
import { Header } from '@polkadot/primitives/header';
import { Logger } from '@polkadot/util/types';

export type ChainName = 'dev';
export type ChainType = 'polkadot' | 'substrate';

export type ChainJson = {
  bootNodes: Array<string>,
  genesis: {
    raw: {
      [index: string]: string
    }
  },
  id: string,
  name: string
};

export type ChainGenesis = {
  block: Uint8Array,
  code: Uint8Array,
  header: Header,
  headerHash: Uint8Array
};

export interface ChainInterface {
  initialise (config: Config): Promise<void>;

  blocks: BlockDb,
  chain: ChainJson,
  executor: ExecutorInterface,
  genesis: ChainGenesis,
  state: StateDb
}

export type ChainState = {
  blockDb: BlockDb,
  config: Config,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: StateDb
};
