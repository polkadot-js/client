// Copyright 2017-2019 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SyncStatus } from '@polkadot/client-p2p/types';

export type Level = 'INFO';

export type Message = 'system.connected' | 'system.interval' | 'node.start' | 'block.import';

export type BaseJson = {
  level: Level,
  msg: Message,
  ts: string
};

export type BlockJson = BaseJson & {
  best: string,
  height: number
};

export type ConnectedJson = BaseJson & {
  chain: string,
  config: string,
  implementation: string,
  name: string,
  version: string
};

export type IntervalJson = BlockJson & {
  cpu?: number,
  memory?: number,
  peers: number,
  status: SyncStatus,
  txcount: number
}
