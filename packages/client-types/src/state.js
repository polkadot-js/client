// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HashType, ObjectIdType } from './base';

export type StateType$Storage = {
  code_hash: HashType,
  storage_root: HashType
};

export type StateType = {
  [ObjectIdType]: StateType$Storage
};
