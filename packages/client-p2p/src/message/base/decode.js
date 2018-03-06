// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageState } from '../types';

const assert = require('@polkadot/util/assert');
const u8aToBn = require('@polkadot/util/u8a/toBn');

// flowlint-next-line unclear-type: off
module.exports = function decode (self: MessageState, _id: Uint8Array, data: Array<*>): any {
  const id = u8aToBn(_id).toNumber();

  assert(id === self.id, 'Expected message id to match');

  return self.impl.rawDecode(data);
};
