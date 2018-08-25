// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockAttrMap } from '../types';

const all: BlockAttrMap = {
  header: 0b00000001,
  body: 0b00000010,
  receipt: 0b00000100,
  messageQueue: 0b00001000,
  justification: 0b00010000
};

export default all;
