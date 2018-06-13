// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Config, Endpoint } from '../types';

const newHead = async (): Promise<string> =>
  'chain_newHead';

module.exports = (config: Config, chain: ChainInterface): Endpoint => ({
  'subscribe_newHead': newHead
});
