// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { BlockRequestMessage } from '../types';
import type { BlockRequestEncoded } from './types';

import BN from 'bn.js';

import defaults from '../../defaults';
import base from '../base';
import rawDecode from './rawDecode';
import rawEncode from './rawEncode';

const TYPE: number = 1;

export default function blockRequest ({ direction = 'ascending', fields = ['header', 'body'], from, id, max = defaults.MAX_SYNC_BLOCKS, to }: $Shape<BlockRequestMessage>): MessageInterface {
  const raw: BlockRequestMessage = {
    direction,
    fields,
    from: from || new BN(0),
    id,
    max,
    to
  };

  return base(TYPE, {
    raw,
    rawDecode: (data: BlockRequestEncoded): BlockRequestMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockRequestEncoded =>
      rawEncode(raw)
  });
}

blockRequest.TYPE = TYPE;
