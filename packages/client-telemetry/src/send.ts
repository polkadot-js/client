// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { State } from './types';
import Base from './messages/Base';

export default function send (self: State, message: Base): void {
  if (!self || !self.websocket) {
    return;
  }

  const json = JSON.stringify(message);

  self.l.debug(() => `Sending ${json}`);

  self.websocket.send(json);
}
