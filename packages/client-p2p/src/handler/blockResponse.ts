// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { P2pInterface, PeerInterface } from '../types';
import { Handler } from './types';

import { BlockResponse } from '@polkadot/client-types/messages';

function handleBlockResponse ({ sync }: P2pInterface, peer: PeerInterface, message: BlockResponse): void {
  // self.l.debug(() => [peer.shortId, 'BlockResponse', JSON.stringify(message)]);

  sync.queueBlocks(peer, message);
}

(handleBlockResponse as Handler).type = BlockResponse.type;

export default (handleBlockResponse as Handler);
