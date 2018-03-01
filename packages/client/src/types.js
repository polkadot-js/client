// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainNameType } from '@polkadot/client-chains/types';
import type { DbConfigType } from '@polkadot/client-db/types';
import type { P2pConfigType } from '@polkadot/client-p2p/types';
import type { RpcConfigType, HandlerType } from '@polkadot/client-rpc/types';
import type { WasmConfigType } from '@polkadot/client-wasm/types';
import type { RoleType } from '@polkadot/primitives/role';

export type DevConfigType = {
  genBlocks: boolean
};

export type ConfigType = {
  chain: ChainNameType,
  db: DbConfigType,
  dev: DevConfigType,
  p2p: P2pConfigType,
  rpc: RpcConfigType,
  roles: Array<RoleType>,
  wasm: WasmConfigType
};

export type EndpointType = {
  [string]: HandlerType
};
