// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RoleType } from './index';

import all from './all';

module.exports = function mapRoleToId (role: RoleType): number {
  return all[role];
};
