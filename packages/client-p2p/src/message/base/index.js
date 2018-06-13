// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, RawMessage } from '../../types';
import type { MessageImpl } from '../types';

const decode = require('./decode');
const encode = require('./encode');

module.exports = function base (type: number, impl: MessageImpl): MessageInterface {
  const self = {
    type,
    impl
  };

  return {
    // flowlint-next-line unclear-type: off
    decode: (data: RawMessage): any =>
      decode(self, data),
    encode: (): RawMessage =>
      encode(self),
    raw: impl.raw,
    type
  };
};
