// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { MessageInterface } from '../types';
import type { CallbackType } from './types';

const assert = require('@polkadot/util/assert');
const isObject = require('@polkadot/util/is/object');

const rlpEncode = require('../rlp/encode');

module.exports = function streamWriter (message: MessageInterface): any {
  assert(isObject(message), 'Expected message of type MessageInterface');

  const encoded = rlpEncode(message);

  console.log('W', encoded);

  let isDone = false;

  return (end: ?Error | boolean, next: CallbackType): void => {
    if (end) {
      return next(end);
    }

    if (isDone) {
      return next(true);
    }

    isDone = true;
    next(null, encoded);
  };
};
