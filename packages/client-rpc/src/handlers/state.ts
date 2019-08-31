// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Endpoint } from './types';

import { u8aToHex, u8aToU8a } from '@polkadot/util';

const getStorage = ({ state: { db } }: ChainInterface): (params: string[]) => Promise<string> =>
  // eslint-disable-next-line @typescript-eslint/require-await
  async ([key]: string[]): Promise<string> =>
    u8aToHex(
      db.get(u8aToU8a(key))
    );

export default (config: Config, chain: ChainInterface): Endpoint => ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  state_getStorage: getStorage(chain)
});
