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

  const node = new Libp2p(modules, listener, peerBook);

  // HACK stub floodsub (it is not enabled for Polkadot Rust, however it is a default for JS, noop the start). With libp2p 0.21.0 this won't be needed anymore since floodsub can be switched on/off
  // @ts-ignore
  node._floodSub.start = (cb) => {
    cb();
  };

  return node;
}
