// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export type DbPathPrefix = 'database';

export type DbConfig$Type = 'disk' | 'memory';

export type DbConfig = {
  path: string,
  type: DbConfig$Type
};

export interface BaseDb {
  del: (key: Uint8Array) => void,
  get: (key: Uint8Array) => Uint8Array | null,
  put: (key: Uint8Array, value: Uint8Array) => void
}

export interface TrieDb extends BaseDb {
  checkpoint: () => void,
  commit: () => void,
  revert: () => void,
  trieRoot: () => Uint8Array
}
