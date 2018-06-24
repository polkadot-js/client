// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { StatusMessage } from '../types';
import { StatusEncoded } from './types';

import accountIdDecode from '@polkadot/primitives-json/accountId/decode';
import bnDecode from '@polkadot/primitives-json/bn/decode';
import hashDecode from '@polkadot/primitives-json/hash/decode';
import parachainIdDecode from '@polkadot/primitives-json/parachainId/decode';
import signatureDecode from '@polkadot/primitives-json/signature/decode';

export default function rawDecode (raw: StatusMessage, { bestHash, bestNumber, genesisHash, parachainId = '0x00', roles, validatorId = '0x00', validatorSignature = '0x00', version }: StatusEncoded): StatusMessage {
  raw.bestNumber = bnDecode(bestNumber, 64);
  raw.bestHash = hashDecode(bestHash, 256);
  raw.genesisHash = hashDecode(genesisHash, 256);
  raw.parachainId = parachainIdDecode(parachainId);
  raw.roles = roles;
  raw.validatorId = accountIdDecode(validatorId);
  raw.validatorSignature = signatureDecode(validatorSignature);
  raw.version = version;

  return raw;
}
