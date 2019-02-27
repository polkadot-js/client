// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Chainspec } from '@polkadot/chainspec/types';

import { alexander, drieddanta } from '@polkadot/chainspec';

import dev from './dev';

export default ({
  dev,
  alexander,
  drieddanta
} as { [index: string]: Chainspec });
