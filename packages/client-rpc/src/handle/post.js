// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RpcState, PostContextType } from '../types';

const coBody = require('co-body');

const handleMessage = require('./message');

module.exports = async function handlePost (self: RpcState, ctx: PostContextType): Promise<void> {
  const message: string = await coBody.text(ctx.req);
  const response = await handleMessage(self, message);

  ctx.type = 'application/json';
  ctx.body = JSON.stringify(response);
};
