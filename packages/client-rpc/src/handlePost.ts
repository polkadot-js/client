// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RpcState, PostContext } from './types';

import coBody from 'co-body';

import handleMessage from './handleMessage';

type Handler = (ctx: PostContext) => Promise<void>;

export default function handlePost (self: RpcState): Handler {
  return async (ctx: PostContext): Promise<void> => {
    const message: string = await coBody.text(ctx.req);
    const response = await handleMessage(self, message);

    ctx.type = 'application/json';
    ctx.body = JSON.stringify(response);
  };
}
