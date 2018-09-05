// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { BlockDb } from '@polkadot/client-db/types';
import { SyncStatus } from '@polkadot/client-p2p/types';
import { Logger } from '@polkadot/util/types';
import Base from './messages/Base';

export type TelemetryConfig = {
  name: string,
  url: string
};

export interface TelemetryInterface {
  blockImported: () => void,
  intervalInfo: (peers: number, status: SyncStatus) => void,
  start: () => Promise<void>
}
