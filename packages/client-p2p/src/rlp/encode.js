// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { MessageInterface } from '../types';

const rlp = require('rlp');

module.exports = function rlpEncode (message: MessageInterface): Buffer {
  return rlp.encode(
    message.encode()
  );
};
