// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainName } from '@polkadot/client-chains/types';
import { DbConfig } from '@polkadot/client-db/types';
import { P2pConfig } from '@polkadot/client-p2p/types';
import { RpcConfig } from '@polkadot/client-rpc/types';
import { SyncTypes } from '@polkadot/client-sync/types';
import { TelemetryConfig } from '@polkadot/client-telemetry/types';
import { WasmConfig } from '@polkadot/client-wasm/types';

export type Config = {
  chain: ChainName,
  db: DbConfig,
  p2p: P2pConfig,
  rpc: RpcConfig,
  sync: SyncTypes,
  telemetry: TelemetryConfig,
  wasm: WasmConfig
};

export type ConfigPartial = {
  chain: ChainName,
  db: DbConfig,
  p2p: P2pConfig,
  rpc: RpcConfig | null,
  sync: SyncTypes,
  telemetry: TelemetryConfig | null,
  wasm: WasmConfig
};

export type ConfigKeys = keyof Config;
