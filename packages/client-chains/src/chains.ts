// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Chainspec } from '@polkadot/chainspec/types';

import * as specs from '@polkadot/chainspec';

type SpecKey = keyof typeof specs;

const chains = Object.keys(specs).reduce((chains: Record<string, Chainspec>, key): Record<string, Chainspec> => {
  const chain = specs[key as SpecKey];

  chains[chain.id] = chain;

  return chains;
}, {});

export default chains;
