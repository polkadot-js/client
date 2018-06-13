// Copyright 2017-2018 @polkadot/client-rpc authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Handler, WsContext$Socket, SubInterface } from '../types';
import type { Sockets, Subscriptions } from './types';

const send = require('./send');
const update = require('./update');

const sockets: Sockets = {};
const subscriptions: Subscriptions = {};

let nextSubId = -1;

module.exports = function subscriber (chain: ChainInterface): SubInterface {
  update(chain, subscriptions, sockets);

  // flowlint-next-line unclear-type:off
  return async (socket?: WsContext$Socket, handler: Handler, params: Array<any>): Promise<number> => {
    const method = await handler(params);

    const subId = nextSubId++;

    if (socket !== undefined) {
      sockets[subId] = socket;
      subscriptions[method] = subscriptions[method] || { value: undefined, subscriptions: [] };
      subscriptions[method].subscriptions.push(subId);

      socket.on('close', (): void => {
        delete sockets[subId];
      });

      send(socket, method, subId, subscriptions[method].value);
    }

    return subId;
  };
};
