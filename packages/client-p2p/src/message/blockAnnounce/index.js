// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { BlockAnnounceMessage } from '../types';
import type { BlockAnnounceEncoded } from './types';

const createHeader = require('@polkadot/primitives-builder/header');

const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const TYPE: number = 3;

module.exports = function blockAnnounce ({ header = createHeader({}) }: $Shape<BlockAnnounceMessage>): MessageInterface {
  const raw: BlockAnnounceMessage = {
    header
  };

  return base(TYPE, {
    raw,
    rawDecode: (data: BlockAnnounceEncoded): BlockAnnounceMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockAnnounceEncoded =>
      rawEncode(raw)
  });
};

module.exports.TYPE = TYPE;
