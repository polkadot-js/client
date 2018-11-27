// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { WsContext$Socket } from '../types';

import createJson from '../create/json';

export default function send (socket: WsContext$Socket, method: string, subscription: number, result: any): void {
  if (result === undefined) {
    return;
  }

  socket.send(
    JSON.stringify(
      createJson(undefined, {
        method,
        params: {
          result,
          subscription
        }
      })
    )
  );
}
