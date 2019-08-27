// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Endpoint } from './types';

import * as clientId from '@polkadot/client/clientId';

const systemChain = ({ chain: { name } }: ChainInterface): () => Promise<string> =>
  async (): Promise<string> =>
    name;

const systemName = async (): Promise<string> =>
  clientId.name;

const systemVersion = async (): Promise<string> =>
  clientId.version;

export default (config: Config, chain: ChainInterface): Endpoint => ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  system_chain: systemChain(chain),
  // eslint-disable-next-line @typescript-eslint/camelcase
  system_name: systemName,
  // eslint-disable-next-line @typescript-eslint/camelcase
  system_version: systemVersion
});
