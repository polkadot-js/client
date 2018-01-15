// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';

const rlp = require('rlp');

const bufferToNumber = require('@polkadot/util/buffer/toNumber');

const message = require('../message');

module.exports = function rlpDecode (buffer: Buffer): MessageInterface {
  const [idBuffer, raw] = rlp.decode(buffer);
  const id = bufferToNumber(idBuffer);
  const instance: MessageInterface = message(id);

  instance.decode(id, raw);

  return instance;
};
