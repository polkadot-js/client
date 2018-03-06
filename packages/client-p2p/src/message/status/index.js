// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { StatusMessage } from '../types';

const BN = require('bn.js');

const defaults = require('../../defaults');
const base = require('../base');
const rawDecode = require('./rawDecode');
const rawEncode = require('./rawEncode');

const MESSAGE_ID: number = 0;

module.exports = function status ({ bestHash = new Uint8Array(32), bestNumber = new BN(0), genesisHash = new Uint8Array(32), parachainId = new BN(0), roles = ['none'], validatorId = new Uint8Array(32), validatorSignature = new Uint8Array(64), version = defaults.PROTOCOL_VERSION }: $Shape<StatusMessage>): MessageInterface {
  const raw: StatusMessage = {
    bestHash,
    bestNumber,
    genesisHash,
    parachainId,
    roles,
    validatorId,
    validatorSignature,
    version
  };

  return base(MESSAGE_ID, {
    raw,
    rawDecode: (data: Array<*>): StatusMessage =>
      rawDecode(raw, data),
    rawEncode: (): Array<*> =>
      rawEncode(raw)
  });
};

module.exports.MESSAGE_ID = MESSAGE_ID;