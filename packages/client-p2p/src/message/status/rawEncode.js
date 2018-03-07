// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StatusMessage } from '../types';
import type { StatusEncoded } from './types';

const bnEncode = require('@polkadot/primitives-json/bn/encode');
const hashEncode = require('@polkadot/primitives-json/hash/encode');

module.exports = function rawEncode ({ bestHash, bestNumber, genesisHash, parachainId, roles, validatorId, validatorSignature, version }: StatusMessage): StatusEncoded {
  return {
    bestHash: hashEncode(bestHash, 256),
    bestNumber: bnEncode(bestNumber, 64),
    genesisHash: hashEncode(genesisHash, 256),
    roles,
    version
    // TODO: validatorId, validatorSignature, parachainId
  };
};
