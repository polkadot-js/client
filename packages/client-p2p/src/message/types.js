// ISC, Copyright 2017 Jaco Greeff
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
