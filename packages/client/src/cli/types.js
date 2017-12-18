// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainNameType } from '@polkadot/client-chains/types';
import type { DbConfigType } from '@polkadot/client-db/types';
import type { P2pConfigType } from '@polkadot/client-p2p/types';
import type { RpcConfigType } from '@polkadot/client-rpc/types';
import type { RoleType } from '@polkadot/primitives/role';

export type ConfigType = {
  chain: ChainNameType,
  db: DbConfigType,
  p2p: P2pConfigType,
  rpc: RpcConfigType,
  roles: Array<RoleType>
};
