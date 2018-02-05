// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type PathPrefixType = 'database';

export type DbConfigType$Type = 'disk' | 'memory';

export type DbConfigType = {
  path: string,
  type: DbConfigType$Type
};

export interface DbInterface {
  del (key: string): Promise<boolean>,
  get (key: string): Promise<Buffer>,
  put (key: string, value: Buffer | string): Promise<Buffer | string>
}

export type Db$Pair = {
  key: Uint8Array,
  value: Uint8Array
};

export type Db$Pairs = Array<Db$Pair>;

export type BaseDbInterface = {
  commit (values?: Db$Pairs): void,
  del (key: Uint8Array): void,
  get (key: Uint8Array): Uint8Array,
  pairs: () => Db$Pairs,
  set (key: Uint8Array, value: Uint8Array): void
}
