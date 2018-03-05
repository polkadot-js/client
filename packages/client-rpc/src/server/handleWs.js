// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WsContextType } from '../types';
import type { RpcState } from './types';

type HandlerType = (ctx: WsContextType) => void;

const handleMessage = require('./handleMessage');

module.exports = function handleWs (self: RpcState): HandlerType {
  return (ctx: WsContextType): void => {
    ctx.websocket.on('message', async (message: string) => {
      const response = await handleMessage(self, message);

      ctx.websocket.send(
        JSON.stringify(response)
      );
    });
  };
};
