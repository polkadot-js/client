// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StatusMessage } from '../types';
import type { StatusEncoded } from './types';

const accountIdDecode = require('@polkadot/primitives-json/accountId/decode');
const bnDecode = require('@polkadot/primitives-json/bn/decode');
const hashDecode = require('@polkadot/primitives-json/hash/decode');
const parachainIdDecode = require('@polkadot/primitives-json/parachainId/decode');
const signatureDecode = require('@polkadot/primitives-json/signature/decode');

module.exports = function rawDecode (raw: StatusMessage, { bestHash, bestNumber, genesisHash, parachainId = '0x00', roles, validatorId = '0x00', validatorSignature = '0x00', version }: StatusEncoded): StatusMessage {
  raw.bestNumber = bnDecode(bestNumber, 64);
  raw.bestHash = hashDecode(bestHash, 256);
  raw.genesisHash = hashDecode(genesisHash, 256);
  raw.parachainId = parachainIdDecode(parachainId);
  raw.roles = roles;
  raw.validatorId = accountIdDecode(validatorId);
  raw.validatorSignature = signatureDecode(validatorSignature);
  raw.version = version;

  return raw;
};
