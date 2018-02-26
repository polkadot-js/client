// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ChainConfigType, ChainConfigTypeLoose, ChainConfigType$Number } from '../types';

const bnToBn = require('@polkadot/util/bn/toBn');
const isHex = require('@polkadot/util/is/hex');
const hexToBn = require('@polkadot/util/hex/toBn');
const hexToU8a = require('@polkadot/util/hex/toU8a');

function valueToBn (value: ChainConfigType$Number): BN {
  // $FlowFixMe we are determining type
  if (isHex(value)) {
    // $FlowFixMe type has been determined
    return hexToBn(value);
  }

  // $FlowFixMe type has been determined
  return bnToBn(value);
}

function arrToU8a (values: Array<string>): Array<Uint8Array> {
  return values.map(hexToU8a);
}

function mapToBn (map: { [string]: ChainConfigType$Number }): { [string]: BN } {
  return Object.keys(map).reduce((result, id) => {
    result[id] = valueToBn(map[id]);

    return result;
  }, {});
}

module.exports = function toStrict ({ authorities, balances, code, description, name, nodes, params, type, validators }: ChainConfigTypeLoose): $Shape<ChainConfigType> {
  return {
    authorities: arrToU8a(authorities),
    balances: mapToBn(balances),
    code,
    description,
    name,
    nodes,
    params: mapToBn(params),
    type,
    validators: arrToU8a(validators)
  };
};
