// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Handler, WsContext$Socket, SubInterface } from '../types';
import { Sockets, Subscriptions } from './types';

import send from './send';
import update from './update';

const sockets: Sockets = {};
const subscriptions: Subscriptions = {};

let nextSubId = -1;

export default function subscriber (chain: ChainInterface): SubInterface {
  update(chain, subscriptions, sockets);

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
}
