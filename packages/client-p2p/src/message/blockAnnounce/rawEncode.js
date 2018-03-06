// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockAnnounceMessage } from '../types';

const blockHeaderEncode = require('@polkadot/primitives-rlp/blockHeader/encode');

module.exports = function rawEncode ({ header }: BlockAnnounceMessage): Array<*> {
  return [
    blockHeaderEncode(header)
  ];
};
