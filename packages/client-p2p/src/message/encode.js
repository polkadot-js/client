// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';

const u8aFromUtf8 = require('@polkadot/util/u8a/fromUtf8');

module.exports = function encode (message: MessageInterface): Uint8Array {
  return u8aFromUtf8(
    JSON.stringify(
      message.encode()
    )
  );
};
