// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { StatusMessage } from '../types';
import { StatusEncoded } from './types';

import bnEncode from '@polkadot/primitives/json/bn/encode';
import hashEncode from '@polkadot/primitives/json/hash/encode';

export default function rawEncode ({ bestHash, bestNumber, genesisHash, parachainId, roles, validatorId, validatorSignature, version }: StatusMessage): StatusEncoded {
  return {
    bestHash: hashEncode(bestHash, 256),
    bestNumber: bnEncode(bestNumber, 64),
    genesisHash: hashEncode(genesisHash, 256),
    roles,
    version
    // TODO: validatorId, validatorSignature, parachainId
  };
}
