// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { State } from './types';

import sendInitial from './sendInitial';

export default function connect (self: State): void {
  const websocket = new WebSocket(self.url);

  websocket.onclose = () => {
    self.l.debug(() => 'Disconnected from telemetry');

    self.websocket = null;

    setTimeout(() => {
      connect(self);
    }, 5000);
  };

  websocket.onopen = () => {
    self.l.debug(() => 'Connected to telemetry');

    self.websocket = websocket;

    sendInitial(self);
  };
}
