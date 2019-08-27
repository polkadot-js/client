// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface MessageConsole {
  type: 'error' | 'log' | 'warn';
  text: string;
}

export interface MessageImported {
  bestNumber: string;
}

export interface MessageInformant {
  bestNumber: string;
  numPeers: number;
  status: 'Idle' | 'Sync';
}
