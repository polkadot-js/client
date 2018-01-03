// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { BlockNumberType, HeaderHashType } from '@polkadot/primitives/base';
import type { StateType$Best } from '../types';

const BN = require('bn.js');

module.exports = class Best implements StateType$Best {
  hash: HeaderHashType;
  number: BlockNumberType;

  constructor (hash: HeaderHashType = '0x00', number: BN = new BN(0)) {
    this.hash = hash;
    this.number = number;
  }
};
