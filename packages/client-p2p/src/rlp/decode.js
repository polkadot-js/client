// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { MessageInterface } from '../types';

const rlp = require('rlp');

const assert = require('@polkadot/util/assert');
const isInstanceOf = require('@polkadot/util/is/instanceOf');
const bufferToNumber = require('@polkadot/util/buffer/toNumber');

const message = require('../message');

module.exports = function messageRlpDecode (buffer: Buffer): MessageInterface {
  assert(isInstanceOf(buffer, Buffer), 'Expected valid message buffer');

  const [idBuffer, raw] = rlp.decode(buffer);
  const id = bufferToNumber(idBuffer);
  const instance: MessageInterface = message(id);

  instance.decodeRlp(id, raw);

  return instance;
};
