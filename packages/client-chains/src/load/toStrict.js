// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ChainConfig, ChainConfigLoose, ChainConfig$Number } from '../types';

const bnToBn = require('@polkadot/util/bn/toBn');
const isHex = require('@polkadot/util/is/hex');
const hexToBn = require('@polkadot/util/hex/toBn');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const blake2AsU8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

function valueToBn (value: ChainConfig$Number): BN {
  // $FlowFixMe we are determining type
  if (isHex(value)) {
    // $FlowFixMe type has been determined
    return hexToBn(value);
  }

  // $FlowFixMe type has been determined
  return bnToBn(value);
}

module.exports = function toStrict ({ blockTime, description, genesis: { authorities, balances, code, params, validators }, name, networkId, nodes, type }: ChainConfigLoose): $Shape<ChainConfig> {
  return {
    name,
    description,
    type,
    blockTime: valueToBn(blockTime),
    networkId: valueToBn(networkId),
    genesis: {
      authorities: authorities.map(hexToU8a),
      balances: Object.keys(balances).map((accountId) => ({
        accountId: hexToU8a(accountId),
        balance: valueToBn(balances[accountId])
      })),
      code,
      codeHash: blake2AsU8a256(code),
      params: Object.keys(params).reduce((result, param) => {
        result[param] = valueToBn(params[param]);

        return result;
      }, {}),
      validators: validators.map(hexToU8a)
    },
    nodes
  };
};
