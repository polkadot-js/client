// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StatusMessage } from '../types';

const roleToId = require('@polkadot/primitives/role/toId');
const blockNumberEncode = require('@polkadot/primitives-rlp/blockNumber/encode');
const hashEncode = require('@polkadot/primitives-rlp/hash/encode');
const numberToU8a = require('@polkadot/util/number/toU8a');

module.exports = function rawEncode ({ bestHash, bestNumber, genesisHash, parachainId, roles, validatorId, validatorSignature, version }: StatusMessage): Array<*> {
  return [
    numberToU8a(version),
    roles.map(roleToId).map(numberToU8a),
    blockNumberEncode(bestNumber),
    hashEncode(bestHash, 256),
    hashEncode(genesisHash, 256)
    // TODO: validatorId, validatorSignature, parachainId
  ];
};
