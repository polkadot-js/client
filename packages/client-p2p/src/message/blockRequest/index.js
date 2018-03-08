// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { BlockRequestMessage } from '../types';
import type { BlockRequestEncoded } from './types';

const BN = require('bn.js');

const { MAX_SYNC_BLOCKS } = require('../../defaults');
const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const TYPE: number = 1;

module.exports = function blockRequest ({ direction = 'ascending', fields = ['header', 'body'], from, id, max = MAX_SYNC_BLOCKS, to }: $Shape<BlockRequestMessage>): MessageInterface {
  const raw: BlockRequestMessage = {
    direction,
    fields,
    from: from || new BN(0),
    id,
    max,
    to
  };

  return base(TYPE, {
    raw,
    rawDecode: (data: BlockRequestEncoded): BlockRequestMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockRequestEncoded =>
      rawEncode(raw)
  });
};

module.exports.TYPE = TYPE;
