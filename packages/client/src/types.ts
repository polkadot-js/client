// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainName } from '@polkadot/client-chains/types';
import { DbConfig } from '@polkadot/client-db/types';
import { P2pConfig } from '@polkadot/client-p2p/types';
import { RpcConfig } from '@polkadot/client-rpc/types';
import { SignalConfig } from '@polkadot/client-signal/types';
import { SyncTypes } from '@polkadot/client-sync/types';
import { TelemetryConfig } from '@polkadot/client-telemetry/types';
import { WasmConfig } from '@polkadot/client-wasm/types';

export interface Config {
  chain: ChainName;
  db: DbConfig;
  externalIp?: string | null;
  p2p: P2pConfig;
  rpc: RpcConfig;
  signal: SignalConfig;
  sync: SyncTypes;
  telemetry: TelemetryConfig;
  wasm: WasmConfig;
}

export interface ConfigPartial {
  chain: ChainName;
  db: DbConfig;
  externalIp?: string | null;
  p2p: P2pConfig;
  rpc: RpcConfig | null;
  signal: SignalConfig | null;
  sync: SyncTypes;
  telemetry: TelemetryConfig | null;
  wasm: WasmConfig;
}

export type ConfigKeys = keyof Config;
