// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';

import logger from '@polkadot/util/logger';

const l = logger('telemetry');

export default function telemetry ({ telemetry: { name, url } }: Config, chain: ChainInterface) {
  if (!name || !url) {
    return;
  }

  const websocket = new WebSocket(url);

  // self.websocket.onclose = onClose(self);
  // self.websocket.onerror = onError(self);
  // self.websocket.onmessage = onMessage(self);
  // self.websocket.onopen = onOpen(self);
}
