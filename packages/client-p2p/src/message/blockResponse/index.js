// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockResponseMessage } from '../types';
import type { MessageInterface } from '../../types';

const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const MESSAGE_ID: number = 2;

module.exports = function blockResponse (): MessageInterface {
  const raw: BlockResponseMessage = {
  };

  return base(MESSAGE_ID, {
    raw,
    rawDecode: (data: Array<*>): BlockResponseMessage =>
      rawDecode(raw, data),
    rawEncode: (): Array<*> =>
      rawEncode(raw)
  });
};

module.exports.MESSAGE_ID = MESSAGE_ID;
