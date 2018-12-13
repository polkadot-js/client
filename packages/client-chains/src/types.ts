// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb } from '@polkadot/client-db/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { BlockData } from '@polkadot/client-types/index';
import { ExecutorInterface } from '@polkadot/client-wasm/types';
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
  block: BlockData,
  code: Uint8Array
};

export interface ChainLoader {
  readonly chain: ChainJson;
  readonly id: string;
  readonly genesisRoot: Uint8Array;
}

export interface ChainInterface {
  readonly blocks: BlockDb;
  readonly state: StateDb;
  readonly chain: ChainJson;
  readonly executor: ExecutorInterface;
  readonly genesis: ChainGenesis;
}

export type ChainState = {
  blockDb: BlockDb,
  config: Config,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: StateDb
};
