// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Config, Endpoint } from '../types';

type AsyncCall = () => Promise<string>;

const { name, version } = require('../clientId');

const systemChain = ({ chain }: Config): AsyncCall =>
  async (): Promise<string> =>
    chain;

const systemName = async (): Promise<string> =>
  name;

const systemVersion = async (): Promise<string> =>
  version;

module.exports = (config: Config, chain: ChainInterface): Endpoint => ({
  'system_chain': systemChain(config),
  'system_name': systemName,
  'system_version': systemVersion
}: Endpoint);
