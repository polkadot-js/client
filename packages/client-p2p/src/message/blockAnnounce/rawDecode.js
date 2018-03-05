// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockAnnounceMessage } from '../types';

const blockHeaderDecode = require('@polkadot/primitives-rlp/blockHeader/decode');
const assert = require('@polkadot/util/assert');

module.exports = function rawDecode (raw: BlockAnnounceMessage, data: Array<*>): BlockAnnounceMessage {
  assert(data.length >= 1, 'Expected correct message length');

  const [header] = data;

  raw.header = blockHeaderDecode(header);

  return raw;
};
