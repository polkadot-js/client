// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type DbPathPrefix = 'database';

export type DbConfig$Type = 'disk' | 'memory';

export type DbConfig = {
  path: string,
  type: DbConfig$Type
};
