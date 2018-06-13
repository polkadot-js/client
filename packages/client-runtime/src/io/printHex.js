// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Logger } from '@polkadot/util/types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function print (l: Logger, data: Uint8Array): void {
  l.log(
    u8aToHex(data)
  );
};
