// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Role } from '@polkadot/primitives/role';

export type StatusEncoded = {
  bestHash: string,
  bestNumber: string,
  genesisHash: string,
  parachainId?: string,
  roles: Array<Role>,
  validatorId?: string,
  validatorSignature?: string,
  version: number
};
