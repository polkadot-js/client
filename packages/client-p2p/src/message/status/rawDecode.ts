// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { StatusMessage } from '../types';
import { StatusEncoded } from './types';

import accountIdDecode from '@polkadot/primitives/json/accountId/decode';
import bnDecode from '@polkadot/primitives/json/bn/decode';
import hashDecode from '@polkadot/primitives/json/hash/decode';
import parachainIdDecode from '@polkadot/primitives/json/parachainId/decode';
import signatureDecode from '@polkadot/primitives/json/signature/decode';

export default function rawDecode (raw: StatusMessage, { best_hash, best_number, genesis_hash, parachain_id = '0x00', roles, validator_id = null, validator_signature = null, version }: StatusEncoded): StatusMessage {
  raw.bestNumber = bnDecode(best_number, 64);
  raw.bestHash = hashDecode(best_hash, 256);
  raw.genesisHash = hashDecode(genesis_hash, 256);
  raw.parachainId = parachainIdDecode(parachain_id || '0x00');
  raw.roles = roles;
  raw.validatorId = accountIdDecode(validator_id || '0x00');
  raw.validatorSignature = signatureDecode(validator_signature || '0x00');
  raw.version = version;

  return raw;
}
