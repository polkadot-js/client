// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { StatusMessage } from '../types';
import { StatusEncoded } from './types';

import bnEncode from '@polkadot/primitives/json/bn/encode';
import hashEncode from '@polkadot/primitives/json/hash/encode';

export default function rawEncode ({ bestHash, bestNumber, genesisHash, parachainId, roles, validatorId, validatorSignature, version }: StatusMessage): StatusEncoded {
  return {
    best_hash: hashEncode(bestHash, 256),
    best_number: bnEncode(bestNumber, 64),
    genesis_hash: hashEncode(genesisHash, 256),
    roles,
    version,
    // TODO actual values as required
    parachain_id: null,
    validator_id: null,
    validator_signature: null
  };
}
