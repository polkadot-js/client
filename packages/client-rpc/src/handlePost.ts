// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import * as Koa from 'koa';
import { RpcState } from './types';

import coBody from 'co-body';

import handleMessage from './handleMessage';

type Handler = (ctx: Koa.Context) => Promise<void>;

export default function handlePost (self: RpcState): Handler {
  return async (ctx: Koa.Context): Promise<void> => {
    const message: string = await coBody.text(ctx.req);
    const response = await handleMessage(self, message);

    ctx.type = 'application/json';
    ctx.body = JSON.stringify(response);
  };
}
