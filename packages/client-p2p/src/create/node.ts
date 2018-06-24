// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState } from '../types';

import Libp2p from 'libp2p';

import createModules from './modules';
import createListener from './listener';
import createPeerBook from './peerBook';

export default async function createNode ({ config: { p2p: { address, port, nodes = [] } }, l }: P2pState): Promise<Libp2p> {
  const peerBook = await createPeerBook([]);
  const listener = await createListener(address, port);
  const modules = createModules(listener, nodes);
  const addrs = listener.multiaddrs.toArray().map((addr) => addr.toString());

  l.log(`creating Libp2p with ${addrs.join(', ')}`);

  return new Libp2p(modules, listener, peerBook);
}
