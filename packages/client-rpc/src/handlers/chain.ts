// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Endpoint } from './types';

import { hexToU8a, u8aToHex } from '@polkadot/util';

const subscribeNewHead = async (): Promise<string> =>
  'chain_newHead';

const getBlock = ({ blocks }: ChainInterface): (params: string[]) => Promise<string> =>
  async ([hash]: string[]): Promise<string> => {
    // FIXME This is BlockData, not SignedBlock as it should be
    return u8aToHex(
      blocks.blockData.get(
        hexToU8a(hash)
      )
    );
  };

export default (config: Config, chain: ChainInterface): Endpoint => ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  chain_subscribeNewHead: subscribeNewHead,
  // eslint-disable-next-line @typescript-eslint/camelcase
  chain_getBlock: getBlock(chain)
});
