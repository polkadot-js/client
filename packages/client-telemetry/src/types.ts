// Copyright 2017-2019 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SyncStatus } from '@polkadot/client-p2p/types';

export type TelemetryConfig = {
  name: string,
  url: string
};

export interface TelemetryInterface {
  blockImported: () => void;
  intervalInfo: (peers: number, status: SyncStatus) => void;
  start: () => Promise<void>;
  stop: () => Promise<boolean>;
}
