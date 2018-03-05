// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { MessageImpl } from '../types';

type EnodedType = [Uint8Array, Array<*>];

const decode = require('./decode');
const encode = require('./encode');

module.exports = function base (id: number, impl: MessageImpl): MessageInterface {
  const self = {
    id,
    impl
  };

  return {
    id,
    // flowlint-next-line unclear-type: off
    decode: ([ id, data ]: EnodedType): any =>
      decode(self, id, data),
    encode: (): EnodedType =>
      encode(self),
    raw: impl.raw
  };
};
