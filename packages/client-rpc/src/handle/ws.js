// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RpcState, WsContextType } from '../types';

const handleMessage = require('./message');

module.exports = async function handleWs (self: RpcState, ctx: WsContextType): Promise<void> {
  ctx.websocket.on('message', async (message: string) => {
    const response = await handleMessage(self, message);

    ctx.websocket.send(
      JSON.stringify(response)
    );
  });
};
