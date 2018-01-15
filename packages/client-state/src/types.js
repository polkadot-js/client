// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { AccountIdType, BlockNumberType, HeaderHashType, ParachainIdType, SignatureType } from '@polkadot/primitives/base';

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
