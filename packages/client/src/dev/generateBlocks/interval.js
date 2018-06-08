// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { P2pInterface } from '@polkadot/client-p2p/types';
import type { Logger } from '@polkadot/util/types';

module.exports = function interval (l: Logger, { blocks, executor }: ChainInterface, p2p: P2pInterface): void {
  l.debug(() => 'Running block generation');

  const block = executor.generateBlock([]);
  const result = executor.importBlock(block);

  if (result) {
    const { body, header, headerHash } = result;

    p2p._announceBlock(headerHash, header, body);
  }
};
