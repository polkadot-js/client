// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config, Endpoint } from '../types';

import * as clientId from '../clientId';

const systemChain = ({ chain }: Config): () => Promise<string> =>
  async (): Promise<string> =>
    chain;

const systemName = async (): Promise<string> =>
  clientId.name;

const systemVersion = async (): Promise<string> =>
  clientId.version;

export default (config: Config, chain: ChainInterface): Endpoint => ({
  'system_chain': systemChain(config),
  'system_name': systemName,
  'system_version': systemVersion
});
