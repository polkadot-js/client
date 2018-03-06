// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageState } from '../types';

const numberToU8a = require('@polkadot/util/number/toU8a');

module.exports = function encode (self: MessageState): [Uint8Array, Array<*>] {
  return [
    numberToU8a(self.id),
    self.impl.rawEncode()
  ];
};
