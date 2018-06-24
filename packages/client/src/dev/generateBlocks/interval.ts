// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { P2pInterface } from '@polkadot/client-p2p/types';
import { Logger } from '@polkadot/util/types';

export default function interval (l: Logger, { blocks, executor }: ChainInterface, p2p: P2pInterface): void {
  l.debug(() => 'Running block generation');

  const block = executor.generateBlock([]);
  const result = executor.importBlock(block);

  if (result) {
    const { body, header, headerHash } = result;

    p2p._announceBlock(headerHash, header, body);
  }
}
