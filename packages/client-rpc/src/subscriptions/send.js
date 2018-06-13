// Copyright 2017-2018 @polkadot/client-rpc authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WsContext$Socket } from '../types';

const createJson = require('../create/json');

// flowlint-next-line unclear-type:off
module.exports = function send (socket: WsContext$Socket, method: string, subscription: number, result: any): void {
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
};
