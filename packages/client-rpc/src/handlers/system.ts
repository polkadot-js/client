// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Endpoint } from './types';

import * as clientId from '@polkadot/client/clientId';

const systemChain = ({ chain: { name } }: ChainInterface) =>
  async (): Promise<string> =>
    name;

const systemName = async (): Promise<string> =>
  clientId.name;

const systemVersion = async (): Promise<string> =>
  clientId.version;

export default (config: Config, chain: ChainInterface): Endpoint => ({
  'system_chain': systemChain(chain),
  'system_name': systemName,
  'system_version': systemVersion
});
