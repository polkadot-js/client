// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../types';
import type { MessageInterface } from '../../types';

const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const MESSAGE_ID: number = 1;

module.exports = function blockRequest (): MessageInterface {
  const self: BlockRequestMessage = {
  };

  return base(MESSAGE_ID, {
    raw: self,
    rawDecode: (data: Array<*>): BlockRequestMessage =>
      rawDecode(self, data),
    rawEncode: (): Array<*> =>
      rawEncode(self)
  });
};

module.exports.MESSAGE_ID = MESSAGE_ID;
