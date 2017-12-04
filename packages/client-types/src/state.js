// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HashType, ObjectIdType } from './base';

export type StateType$Storage = {
  codeHash: HashType,
  storageRoot: HashType
};

export type StateType = {
  [ObjectIdType]: StateType$Storage
};
