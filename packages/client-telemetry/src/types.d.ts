// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { BlockDb } from '@polkadot/client-db-chain/types';
import { Logger } from '@polkadot/util/types';
import Base from './messages/Base';

export type TelemetryConfig = {
  name: string,
  url: string
};

export type State = {
  blocks: BlockDb,
  chain: string,
  isActive: boolean,
  l: Logger,
  name: string,
  queued: Array<Base>,
  url: string,
  websocket: WebSocket | null
}

export type Telemetry = {
  blockImported: () => void,
  init: (config: Config, chain: ChainInterface) => void
};
