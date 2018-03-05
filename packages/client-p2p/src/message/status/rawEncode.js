// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StatusMessage } from '../types';

const roleToId = require('@polkadot/primitives/role/toId');
const accountIdEncode = require('@polkadot/primitives-rlp/accountId/encode');
const blockNumberEncode = require('@polkadot/primitives-rlp/blockNumber/encode');
const hashEncode = require('@polkadot/primitives-rlp/hash/encode');
const parachainIdEncode = require('@polkadot/primitives-rlp/parachainId/encode');
const signatureEncode = require('@polkadot/primitives-rlp/signature/encode');
const numberToU8a = require('@polkadot/util/number/toU8a');

module.exports = function rawEncode (self: StatusMessage): Array<*> {
  return [
    numberToU8a(self.version),
    self.roles.map(roleToId).map(numberToU8a),
    blockNumberEncode(self.bestNumber),
    hashEncode(self.bestHash, 256),
    hashEncode(self.genesisHash, 256),
    signatureEncode(self.validatorSignature),
    accountIdEncode(self.validatorId),
    parachainIdEncode(self.parachainId)
  ];
};
