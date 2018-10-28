// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb, ChainDbs } from '@polkadot/client-db/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { ExecutorInterface } from '@polkadot/client-wasm/types';
import { Header } from '@polkadot/types';
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

export interface ChainLoader {
  readonly chain: ChainJson,
  readonly id: string;
  readonly genesisRoot: Uint8Array;
}

export interface ChainInterface {
  readonly blocks: BlockDb,
  readonly state: StateDb,
  readonly chain: ChainJson,
  readonly executor: ExecutorInterface,
  readonly genesis: ChainGenesis
}

export type ChainState = {
  blockDb: BlockDb,
  config: Config,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: StateDb
};
