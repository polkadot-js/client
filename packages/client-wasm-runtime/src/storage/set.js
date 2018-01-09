// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { DbInterface } from '@polkadot/client-db/types';

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

module.exports = function set (storage: DbInterface, _key: Uint8Array, _data: Uint8Array): void {
  const key = u8aToBuffer(_key);
  const data = u8aToBuffer(_data);

  storage.put(key, data);
};
