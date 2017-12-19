// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HeaderHashType } from '@polkadot/primitives/base';
import type { ChainConfigType$Genesis } from '@polkadot/client-chains/types';
import type { StateType$Genesis } from '../types';

module.exports = class Genesis implements StateType$Genesis {
  hash: HeaderHashType;

  constructor ({ hash = '0x00' }: ChainConfigType$Genesis) {
    this.hash = hash;
  }
};
