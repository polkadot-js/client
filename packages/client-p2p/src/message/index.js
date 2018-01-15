// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';

const assert = require('@polkadot/util/assert');
const isUndefined = require('@polkadot/util/is/undefined');

const StatusMessage = require('./status');

const CLASSES: Array<Class<MessageInterface>> = [
  StatusMessage
];

module.exports = function message (id: number): MessageInterface {
  // $FlowFixMe undefined check with assert
  const Clazz: Class<MessageInterface> = CLASSES.find((Clazz) => Clazz.MESSAGE_ID === id);

  assert(!isUndefined(Clazz), `No message found for id '${id}'`);

  return new Clazz();
};
