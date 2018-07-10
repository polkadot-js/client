// Copyright 2017-2018 @polkadot/client-rpc-handlers authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Endpoint } from './types';

import * as clientId from '@polkadot/client/clientId';

const systemChain = ({ chain }: Config) =>
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
