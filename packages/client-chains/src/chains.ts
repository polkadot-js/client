// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Chainspec } from '@polkadot/chainspec/types';

import * as specs from '@polkadot/chainspec';

const chains = Object.keys(specs).reduce((chains, key) => {
  const chain = (specs as any)[key];

  chains[chain.id] = chain;

  return chains;
}, {} as { [index: string]: Chainspec });

export default chains;
