// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { WsContextSocket } from '../types';

export type Sockets = Record<number, WsContextSocket>;

export type Subscriptions = Record<string, {
  subscriptions: number[];
  value: any;
}>;
