// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, RawMessage } from '../types';

const u8aToUtf8 = require('@polkadot/util/u8a/toUtf8');

const createMessage = require('./create');

module.exports = function decode (u8a: Uint8Array): MessageInterface {
  const message: RawMessage = JSON.parse(
    u8aToUtf8(u8a)
  );
  const instance = createMessage(message.type);

  instance.decode(message);

  return instance;
};
