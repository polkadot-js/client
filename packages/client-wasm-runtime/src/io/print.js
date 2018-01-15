// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Logger } from '@polkadot/util/types';

const u8aToUtf8 = require('@polkadot/util/u8a/toUtf8');

module.exports = function print (l: Logger, data: Uint8Array): void {
  l.log(
    u8aToUtf8(data)
  );
};
