// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '../../types';
import { BlockRequestMessage, MessageFactory } from '../types';
import { BlockRequestEncoded } from './types';

import BN from 'bn.js';

import defaults from '../../defaults';
import base from '../base';
import rawDecode from './rawDecode';
import rawEncode from './rawEncode';

const NAME = 'BlockRequest';
const TYPE = 1;

function blockRequest ({ direction = 'ascending', fields = ['header', 'body'], from, id, max = defaults.MAX_SYNC_BLOCKS, to }: BlockRequestMessage): MessageInterface {
  const raw: BlockRequestMessage = {
    direction,
    fields,
    from: from || new BN(0),
    id,
    max,
    to
  };

  return base(NAME, TYPE, {
    raw,
    rawDecode: (data: BlockRequestEncoded): BlockRequestMessage =>
      rawDecode(raw, data),
    rawEncode: (): BlockRequestEncoded =>
      rawEncode(raw)
  });
}

(blockRequest as MessageFactory<any>).name = NAME;
(blockRequest as MessageFactory<any>).type = TYPE;

export default (blockRequest as MessageFactory<BlockRequestMessage>);
