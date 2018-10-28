// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainName } from '@polkadot/client-chains/types';
import { DbConfig } from '@polkadot/client-db/types';
import { P2pConfig } from '@polkadot/client-p2p/types';
import { RpcConfig } from '@polkadot/client-rpc/types';
import { TelemetryConfig } from '@polkadot/client-telemetry/types';
import { WasmConfig } from '@polkadot/client-wasm/types';
import { Role } from '@polkadot/client-types/role/types';

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
  telemetry: TelemetryConfig,
  wasm: WasmConfig
};

export type ConfigKeys = keyof Config;
