// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage$Direction, BlockRequestMessage$BlockAttribute } from '../types';

const ATTRIBUTES: { [BlockRequestMessage$BlockAttribute]: number } = {
  header: 0b00000001,
  body: 0b00000010,
  receipt: 0b00000100,
  messageQueue: 0b00001000,
  justification: 0b00010000
};

const DIRECTIONS: Array<BlockRequestMessage$Direction> = ['ascending', 'descending'];

module.exports = {
  ATTRIBUTES,
  DIRECTIONS
};
