// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pConfigType, P2pTypes } from '@polkadot/client-p2p/types';
import type { RpcConfigType } from '@polkadot/client-rpc/types';
import type { RoleType } from '@polkadot/client-types/role';

export type ExtP2pConfigType = P2pConfigType & {
  type: P2pTypes
};

export type ConfigType = {
  p2p: ExtP2pConfigType,
  rpc: RpcConfigType,
  role: RoleType
};
