// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';

const rlp = require('@polkadot/util-rlp/encode');

module.exports = function encode (message: MessageInterface): Uint8Array {
  return rlp(
    message.encode()
  );
};
