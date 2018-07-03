// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { State } from './types';

import Connected from './messages/Connected';
import Started from './messages/Started';
import send from './send';

export default function sendInitial (self: State): void {
  const bestHash = self.blocks.bestHash.get();
  const bestNumber = self.blocks.bestNumber.get();

  send(self, new Connected(self.chain, self.name));
  send(self, new Started(bestHash, bestNumber));
}
