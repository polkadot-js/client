// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { HeaderHashType } from '@polkadot/primitives/base';
import type { StateType$Genesis } from '../types';

const hexToU8a = require('@polkadot/util/hex/toU8a');

module.exports = class Genesis implements StateType$Genesis {
  hash: HeaderHashType;

  constructor ({ hash = hexToU8a('0x00', 256) }: StateType$Genesis) {
    this.hash = hash;
  }
};
