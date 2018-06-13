// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainName } from '@polkadot/client-chains/types';
import type { DbConfig } from '@polkadot/client-db/types';
import type { P2pConfig } from '@polkadot/client-p2p/types';
import type { RpcConfig, Handler } from '@polkadot/client-rpc/types';
import type { WasmConfig } from '@polkadot/client-wasm/types';
import type { Role } from '@polkadot/primitives/role';

export type DevConfig = {
  genBlocks: boolean
};

export type Config = {
  chain: ChainName,
  db: DbConfig,
  dev: DevConfig,
  p2p: P2pConfig,
  rpc: RpcConfig,
  roles: Array<Role>,
  wasm: WasmConfig
};

export type Endpoint = {
  [string]: Handler
};
