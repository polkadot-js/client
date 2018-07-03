// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { State } from './types';

import BlockImport from './messages/BlockImport';
import send from './send';

export default function sendBlockImport (self: State): void {
  const bestHash = self.blocks.bestHash.get();
  const bestNumber = self.blocks.bestNumber.get();

  send(self, new BlockImport(bestHash, bestNumber));
}
