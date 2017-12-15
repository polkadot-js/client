// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { MessageInterface } from '../types';

const rlp = require('rlp');

const assert = require('@polkadot/util/assert');
const isUndefined = require('@polkadot/util/is/undefined');

module.exports = function messageRlpEncode (message: MessageInterface): Buffer {
  assert(!isUndefined(message), 'Expected valid message');

  return rlp.encode(
    message.encodeRlp()
  );
};
