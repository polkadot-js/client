// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainJson } from '../types';

const dev = (require('./dev.json') as ChainJson);

export default ({
  dev
} as { [index: string]: ChainJson });
