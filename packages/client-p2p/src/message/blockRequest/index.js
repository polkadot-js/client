// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../types';
import type { MessageInterface } from '../../types';

const BN = require('bn.js');

const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const MESSAGE_ID: number = 1;

module.exports = function blockRequest ({ direction = 'ascending', fields = ['header', 'body'], from = { hash: new Uint8Array(32), number: new BN(0) }, id = Date.now(), max = 64, to }: $Shape<BlockRequestMessage>): MessageInterface {
  const raw: BlockRequestMessage = {
    direction,
    fields,
    from,
    id,
    max,
    to
  };

  return base(MESSAGE_ID, {
    raw,
    rawDecode: (data: Array<*>): BlockRequestMessage =>
      rawDecode(raw, data),
    rawEncode: (): Array<*> =>
      rawEncode(raw)
  });
};

module.exports.MESSAGE_ID = MESSAGE_ID;
