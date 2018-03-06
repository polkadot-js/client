// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockAnnounceMessage } from '../types';
import type { MessageInterface } from '../../types';

const createHeader = require('@polkadot/primitives-builder/header');

const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const MESSAGE_ID: number = 3;

module.exports = function blockAnnounce ({ header = createHeader({}) }: $Shape<BlockAnnounceMessage>): MessageInterface {
  const raw: BlockAnnounceMessage = {
    header
  };

  return base(MESSAGE_ID, {
    raw,
    rawDecode: (data: Array<*>): BlockAnnounceMessage =>
      rawDecode(raw, data),
    rawEncode: (): Array<*> =>
      rawEncode(raw)
  });
};

module.exports.MESSAGE_ID = MESSAGE_ID;
