// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Chainspec } from '@polkadot/chainspec/types';
import { Config } from '@polkadot/client/types';
import { BlockDb, StateDb } from '@polkadot/client-db/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { BlockData } from '@polkadot/client-types';
import { ExecutorInterface } from '@polkadot/client-wasm/types';
import { Logger } from '@polkadot/util/types';

export type ChainName = string;
export type ChainType = 'polkadot' | 'substrate';

export interface ChainGenesis {
  block: BlockData;
  code: Uint8Array;
}

export interface ChainLoader {
  readonly chain: Chainspec;
  readonly id: string;
  readonly genesisRoot: Uint8Array;
}

export interface ChainInterface {
  readonly blocks: BlockDb;
  readonly state: StateDb;
  readonly chain: Chainspec;
  readonly executor: ExecutorInterface;
  readonly genesis: ChainGenesis;

  stop (): void;
}

export interface ChainState {
  blockDb: BlockDb;
  config: Config;
  l: Logger;
  runtime: RuntimeInterface;
  stateDb: StateDb;
}
