// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageState } from '../types';

const assert = require('@polkadot/util/assert');

// flowlint-next-line unclear-type: off
module.exports = function decode (self: MessageState, id: number, data: Array<*>): any {
  assert(id === self.id, 'Expected message id to match');

  return self.impl.rawDecode(data);
};
