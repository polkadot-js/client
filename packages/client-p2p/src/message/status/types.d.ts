// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Role } from '@polkadot/primitives/role';

export type StatusEncoded = {
  best_hash: string,
  best_number: number,
  genesis_hash: string,
  parachain_id?: string | null,
  roles: Array<string>,
  validator_id?: string | null,
  validator_signature?: string | null,
  version: number
};
