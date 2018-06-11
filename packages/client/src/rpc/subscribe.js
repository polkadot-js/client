// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Config, Endpoint } from '../types';

// type Subscriptions = {
//   [number]: () => void
// }

// const subscriptions: Subscriptions = {};

const newHead = ({ state: { db } }: ChainInterface): () => Promise<string> =>
  async (): Promise<string> =>
    '0';

module.exports = (config: Config, chain: ChainInterface): Endpoint => ({
  'subscribe_newHead': newHead(chain)
});
