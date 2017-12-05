// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pConfigType } from '@polkadot/client-p2p/types';
import type { RpcConfigType } from '@polkadot/client-rpc/types';
import type { RoleType } from '@polkadot/client-types/role';

export type ConfigType = {
  p2p: P2pConfigType,
  rpc: RpcConfigType,
  role: RoleType
};
