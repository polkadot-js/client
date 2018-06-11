// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WsContext$Socket } from '../types';

export type Sockets = {
  [number]: WsContext$Socket
};

// method -> Array<subIds>
export type Subscriptions = {
  [string]: {
    subscriptions: Array<number>,
    value: mixed
  }
}
