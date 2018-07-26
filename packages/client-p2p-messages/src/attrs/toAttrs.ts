// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockAttr } from '.../types';

import all from './all';

export default function toAttrs (encoded: number): Array<BlockAttr> {
  return Object
    .keys(all)
    .map((key) =>
      key as BlockAttr
    )
    .filter((attr) =>
      (encoded & all[attr]) === all[attr]
    );
}
