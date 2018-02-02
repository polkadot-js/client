// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Logger } from '@polkadot/util/types';

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const bufferToHex = require('@polkadot/util/buffer/toHex');

module.exports = function print (l: Logger, data: Uint8Array): void {
  l.log(
    bufferToHex(
      u8aToBuffer(data)
    )
  );
};
