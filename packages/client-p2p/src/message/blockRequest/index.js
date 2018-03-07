// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { BlockRequestMessage } from '../types';
import type { BlockRequestEncoded } from './types';

const BN = require('bn.js');

const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const TYPE: number = 1;

module.exports = function blockRequest ({ direction = 'ascending', fields = ['header', 'body'], from = { hash: new Uint8Array(32), number: new BN(0) }, id = Date.now(), max = 64, to }: $Shape<BlockRequestMessage>): MessageInterface {
  const raw: BlockRequestMessage = {
    direction,
    fields,
    from,
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
