// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { DbInterface } from '@polkadot/client-db/types';

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

const utf8Decode = require('../util/utf8Decode');
const syncify = require('../util/syncify');

module.exports = function set (storage: DbInterface, key: Uint8Array, data: Uint8Array): void {
  syncify(
    storage.put(
      utf8Decode(
        u8aToBuffer(key)
      ),
      u8aToBuffer(data)
    )
  );
};
