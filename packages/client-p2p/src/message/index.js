// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';

// flowlint-next-line unclear-type:off
type CreateType = (any) => MessageInterface;

const assert = require('@polkadot/util/assert');
const isUndefined = require('@polkadot/util/is/undefined');

const blockAnnounce = require('./blockAnnounce');
const blockRequest = require('./blockRequest');
const blockResponse = require('./blockResponse');
const status = require('./status');

const CREATORS: Array<CreateType> = [
  status,
  blockRequest,
  blockResponse,
  blockAnnounce
];

// flowlint-next-line unclear-type: off
module.exports = function message (id: number, data?: any): MessageInterface {
  const creator = CREATORS.find((c) => c.MESSAGE_ID === id);

  assert(!isUndefined(creator), `No message found for id '${id}'`);

  // $FlowFixMe undefined check with assert
  return creator(data);
};
