// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export type Message$Console = {
  type: 'error' | 'log' | 'warn',
  text: string
};

export type Message$Imported = {
  bestNumber: string
};

export type Message$Informant = {
  bestNumber: string,
  numPeers: number,
  status: 'Idle' | 'Sync'
};
