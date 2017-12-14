// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { AccountIdType, BlockNumberType, HeaderHashType, ParachainIdType, SignatureType } from '@polkadot/primitives/base';
import type { RoleType } from '@polkadot/primitives/role';

export type StatusMessage = {
  version: number,
  roles: Array<RoleType>,
  bestNumber: BlockNumberType,
  bestHash: HeaderHashType,
  genesisHash: HeaderHashType,
  validatorSignature?: SignatureType,
  validatorId?: AccountIdType,
  parachainId?: ParachainIdType
};

export type StatusMessageJson = {
  version: number,
  roles: Array<number>,
  bestNumber: string,
  bestHash: string,
  genesisHash: string,
  validatorSignature?: string,
  validatorId?: string,
  parachainId?: string
};
