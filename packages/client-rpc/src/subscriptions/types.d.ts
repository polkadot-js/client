// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { WsContext$Socket } from '../types';

export type Sockets = {
  [index: number]: WsContext$Socket
};

// method -> Array<subIds>
export type Subscriptions = {
  [index: string]: {
    subscriptions: Array<number>,
    value: any
  }
}
