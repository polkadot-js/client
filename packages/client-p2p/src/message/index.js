// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { MessageInterface } from '../types';

const assert = require('@polkadot/util/assert');
const isNumber = require('@polkadot/util/is/number');
const isUndefined = require('@polkadot/util/is/undefined');

const StatusMessage = require('./status');

const CLASSES: Array<Class<MessageInterface>> = [
  StatusMessage
];

module.exports = function message (id: number): MessageInterface {
  assert(isNumber(id), 'Expected numeric id');

  // $FlowFixMe undefined check with assert
  const Clazz: Class<MessageInterface> = CLASSES.find((Clazz) => Clazz.MESSAGE_ID === id);

  assert(!isUndefined(Clazz), `No message found for id '${id}'`);

  return new Clazz();
};
