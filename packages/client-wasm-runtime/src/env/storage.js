// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbInterface } from '@polkadot/client-db/types';
import type { RuntimeEnv$Storage } from '../types';

module.exports = function envStorage (db: DbInterface): RuntimeEnv$Storage {
  const data = {};

  return {
    keys: (): Array<string> =>
      Object.keys(data),
    get: (key: string): Uint8Array =>
      data[key],
    set: (key: string, value: Uint8Array): Uint8Array => // eslint-disable-line no-return-assign
      data[key] = value
  };
};
