// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockAttr } from '..Block/types';

import all from './all';

export default function fromAttrs (attrs: Array<BlockAttr>): number {
  return attrs.reduce((result, attr) => {
    return result | all[attr];
  }, 0);
}
