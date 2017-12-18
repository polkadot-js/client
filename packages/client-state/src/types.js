// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { AccountIdType, BlockNumberType, HeaderHashType, ParachainIdType, SignatureType } from '@polkadot/primitives/base';
import type { RoleType } from '@polkadot/primitives/role';

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
  genesis: StateType$Genesis,
  parachain: StateType$Parachain,
  validator: StateType$Validator
}

export interface StatusMessageInterface {
  roles: Array<RoleType>;
}
