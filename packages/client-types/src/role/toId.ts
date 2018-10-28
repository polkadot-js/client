// Copyright 2017-2018 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Role } from './types';

import all from './all';

export default function rolesToId (roles: Array<Role>): number {
  return roles.reduce((encoded, role) => {
    return encoded | all[role];
  }, 0);
}
