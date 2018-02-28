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

module.exports = function toStrict ({ authorities, balances, code, description, name, nodes, params: { approvalRatio, blockTime, bondingDuration, networkId, sessionLength, sessionsPerEra }, type, validators }: ChainConfigTypeLoose): $Shape<ChainConfigType> {
  return {
    authorities: authorities.map(hexToU8a),
    balances: Object.keys(balances).map((accountId) => ({
      accountId: hexToU8a(accountId),
      balance: valueToBn(balances[accountId])
    })),
    code,
    description,
    name,
    nodes,
    params: {
      approvalRatio: valueToBn(approvalRatio),
      blockTime: valueToBn(blockTime),
      bondingDuration: valueToBn(bondingDuration),
      networkId: valueToBn(networkId),
      sessionLength: valueToBn(sessionLength),
      sessionsPerEra: valueToBn(sessionsPerEra)
    },
    type,
    validators: validators.map(hexToU8a)
  };
};
