// Copyright 2017-2018 @polkadot/client-rpc-handlers authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Endpoint } from './types';

import { hexToU8a, u8aToHex } from '@polkadot/util';

const subscribeNewHead = async (): Promise<string> =>
  'chain_newHead';

const getBlock = ({ blocks }: ChainInterface): (params: Array<string>) => Promise<string> =>
  async ([hash]: Array<string>): Promise<string> => {
    return u8aToHex(
      blocks.block.get(
        hexToU8a(hash)
      )
    );
  };

export default (config: Config, chain: ChainInterface): Endpoint => ({
  'chain_subscribeNewHead': subscribeNewHead,
  'chain_getBlock': getBlock(chain)
});
