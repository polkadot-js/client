// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { AccountIdType, BlockNumberType, HeaderHashType, ParachainIdType, SignatureType } from '@polkadot/primitives/base';
import type { RoleType } from '@polkadot/primitives/role';

export interface StatusMessageInterface {
  roles: Array<RoleType>;
  bestNumber: BlockNumberType;
  bestHash: HeaderHashType;
  genesisHash: HeaderHashType;
  validatorSignature: SignatureType;
  validatorId: AccountIdType;
  parachainId: ParachainIdType;
}
