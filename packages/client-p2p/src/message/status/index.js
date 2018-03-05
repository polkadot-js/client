// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { StatusMessage } from '../types';

const BN = require('bn.js');

const hexToU8a = require('@polkadot/util/hex/toU8a');

const defaults = require('../../defaults');
const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const MESSAGE_ID: number = 0;

module.exports = function status ({ bestNumber = new BN(0), bestHash = hexToU8a('0x00', 256), genesisHash = hexToU8a('0x00', 256), roles = ['none'], validatorSignature = hexToU8a('0x00', 512), validatorId = hexToU8a('0x00', 160), parachainId = new BN(0) }: $Shape<StatusMessage> = {}): MessageInterface {
  const self: StatusMessage = {
    bestHash,
    bestNumber,
    genesisHash,
    parachainId,
    roles,
    validatorId,
    validatorSignature,
    version: defaults.PROTOCOL_VERSION
  };

  return base(MESSAGE_ID, {
    raw: self,
    rawDecode: (data: Array<*>): StatusMessage =>
      rawDecode(self, data),
    rawEncode: (): Array<*> =>
      rawEncode(self)
  });
};

module.exports.MESSAGE_ID = MESSAGE_ID;
