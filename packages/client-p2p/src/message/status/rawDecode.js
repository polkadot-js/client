// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StatusMessage } from '../types';

const roleFromId = require('@polkadot/primitives/role/fromId');
const accountIdDecode = require('@polkadot/primitives-rlp/accountId/decode');
const blockNumberDecode = require('@polkadot/primitives-rlp/blockNumber/decode');
const hashDecode = require('@polkadot/primitives-rlp/hash/decode');
const parachainIdDecode = require('@polkadot/primitives-rlp/parachainId/decode');
const signatureDecode = require('@polkadot/primitives-rlp/signature/decode');
const assert = require('@polkadot/util/assert');
const u8aToBn = require('@polkadot/util/u8a/toBn');

module.exports = function rawDecode (self: StatusMessage, data: Array<*>): StatusMessage {
  assert(data.length >= 5, 'Expected correct message length');

  const [version, roles, bestNumber, bestHash, genesisHash, validatorSignature, validatorId, parachainId] = data;

  self.version = u8aToBn((version: Uint8Array)).toNumber();
  self.roles = roles.map((role) => u8aToBn(role).toNumber()).map(roleFromId);
  self.bestNumber = blockNumberDecode(bestNumber);
  self.bestHash = hashDecode(bestHash);
  self.genesisHash = hashDecode(genesisHash);
  self.validatorSignature = signatureDecode(validatorSignature);
  self.validatorId = accountIdDecode(validatorId);
  self.parachainId = parachainIdDecode(parachainId);

  return self;
};
