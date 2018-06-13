// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Config, Endpoint } from '../types';

const clientId = require('../clientId');

const systemChain = ({ chain }: Config): () => Promise<string> =>
  async (): Promise<string> =>
    chain;

const systemName = async (): Promise<string> =>
  clientId.name;

const systemVersion = async (): Promise<string> =>
  clientId.version;

module.exports = (config: Config, chain: ChainInterface): Endpoint => ({
  'system_chain': systemChain(config),
  'system_name': systemName,
  'system_version': systemVersion
});
