// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { HeaderHashType } from '@polkadot/primitives/base';
import type { ChainConfigType$Genesis } from '@polkadot/client-chains/types';
import type { StateType$Genesis } from '../types';

const hexToU8a = require('@polkadot/util/hex/toU8a');

module.exports = class Genesis implements StateType$Genesis {
  hash: HeaderHashType;

  constructor ({ hash = '0x00' }: ChainConfigType$Genesis) {
    this.hash = hexToU8a(hash, 256);
  }
};
