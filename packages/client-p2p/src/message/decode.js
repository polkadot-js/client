// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';

const rlp = require('@polkadot/util-rlp/decode');
const u8aToBn = require('@polkadot/util/u8a/toBn');

const message = require('./create');

module.exports = function decode (u8a: Uint8Array): MessageInterface {
  // flowlint-next-line unclear-type:off
  const data = ((rlp(u8a): any): [Uint8Array, Array<*>]);
  const id = u8aToBn(data[0]).toNumber();
  const instance = message(id);

  instance.decode(data);

  return instance;
};
