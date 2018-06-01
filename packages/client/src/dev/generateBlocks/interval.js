// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { P2pInterface } from '@polkadot/client-p2p/types';
import type { Logger } from '@polkadot/util/types';

module.exports = function interval (l: Logger, { blocks, executor }: ChainInterface, p2p: P2pInterface): void {
  l.debug(() => 'Running block generation');

  const number = blocks.bestNumber.get().addn(1);
  const block = executor.generateBlock(number, []);
  const result = executor.importBlock(block);

  if (result) {
    const { body, hash, header } = result;

    p2p._announceBlock(hash, header, body);
  }
};
