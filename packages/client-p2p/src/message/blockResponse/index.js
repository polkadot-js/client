// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { BlockResponseMessage } from '../types';
import type { BlockResponseEncoded } from './types';

const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const TYPE: number = 2;

module.exports = function blockResponse ({ blocks = [], id = 0 }: $Shape<BlockResponseMessage>): MessageInterface {
  const raw: BlockResponseMessage = {
    blocks,
    id
  };

  return base(TYPE, {
    raw,
    rawDecode: (data: BlockResponseEncoded): BlockResponseMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockResponseEncoded =>
      rawEncode(raw)
  });
};

module.exports.TYPE = TYPE;
