// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { PeerInterface, PeersInterface$Events } from '../types';
import { PeersState } from './types';

export default function logPeer ({ l, emitter }: PeersState, event: PeersInterface$Events, peer: PeerInterface, withShort: boolean = true): void {
  l.log(withShort ? peer.shortId : peer.id, event);

  emitter.emit(event, peer);
}
