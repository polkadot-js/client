// Copyright 2017-2018 @polkadot/client-rpc-handlers authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Endpoint } from './types';

const subscribeNewHead = async (): Promise<string> =>
  'chain_newHead';

export default (config: Config, chain: ChainInterface): Endpoint => ({
  'chain_subscribeNewHead': subscribeNewHead
});
