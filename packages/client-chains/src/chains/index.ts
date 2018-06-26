// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainGenesisState } from '../types';

const dev = (require('./chain-dev.json') as ChainGenesisState);

export default ({
  dev
} as { [index: string]: ChainGenesisState });
