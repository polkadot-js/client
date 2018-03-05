// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PostContextType } from '../types';
import type { RpcState } from './types';

type HandlerType = (ctx: PostContextType) => Promise<void>;
const coBody = require('co-body');

const handleMessage = require('./handleMessage');

module.exports = function handlePost (self: RpcState): HandlerType {
  return async (ctx: PostContextType): Promise<void> => {
    const message: string = await coBody.text(ctx.req);
    const response = await handleMessage(self, message);

    ctx.type = 'application/json';
    ctx.body = JSON.stringify(response);
  };
};
