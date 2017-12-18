// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType, ChainNameType } from '@polkadot/client-chains/types';
import type { DbConfigType } from '@polkadot/client-db/types';
import type { P2pConfigType } from '@polkadot/client-p2p/types';
import type { RpcConfigType } from '@polkadot/client-rpc/types';
import type { AccountIdType, BlockNumberType, HeaderHashType, ParachainIdType, SignatureType } from '@polkadot/primitives/base';
import type { RoleType } from '@polkadot/primitives/role';

export type ConfigType = {
  chain: ChainNameType,
  db: DbConfigType,
  p2p: P2pConfigType,
  rpc: RpcConfigType,
  roles: Array<RoleType>
};

export interface StateType$Genesis {
  hash: HeaderHashType;
}

export interface StateType$Best {
  number: BlockNumberType,
  hash: HeaderHashType
}

export interface StateType$Parachain {
  id?: ParachainIdType
}

export interface StateType$Validator {
  id?: AccountIdType,
  signature?: SignatureType
}

export interface StateInterface {
  best: StateType$Best,
  chain: ChainConfigType,
  config: ConfigType,
  genesis: StateType$Genesis,
  parachain: StateType$Parachain,
  validator: StateType$Validator
}
