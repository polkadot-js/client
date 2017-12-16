// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { MessageInterface } from '../types';

const rlp = require('rlp');

const assert = require('@polkadot/util/assert');
const isInstanceOf = require('@polkadot/util/is/instanceOf');

const BaseMessage = require('../message/base');

module.exports = function rlpEncode (message: MessageInterface): Buffer {
  assert(isInstanceOf(message, BaseMessage), 'Expected valid message');

  return rlp.encode(
    message.encode()
  );
};
