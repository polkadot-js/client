// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { State } from './types';

import logger from '@polkadot/util/logger';

const l = logger('telemetry');

export default function state ({ chain, telemetry: { name, url } }: Config, { blocks }: ChainInterface): State {
  return {
    blocks,
    chain,
    isActive: !!name && !!url,
    l,
    name,
    queued: [],
    url,
    websocket: null
  };
}
