// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Sockets, Subscriptions } from './types';

import decodeHeader from '@polkadot/primitives-codec/header/decode';
import jsonHeader from '@polkadot/primitives-json/header/encode';

import send from './send';

const updateAll = (subscriptions: Subscriptions, sockets: Sockets, method: string, value: any): void => {
  if (subscriptions[method] === undefined) {
    subscriptions[method] = {
      value,
      subscriptions: []
    };
  } else {
    subscriptions[method].value = value;
  }

  subscriptions[method].subscriptions.forEach((subId) => {
    const socket = sockets[subId];

    if (socket) {
      send(socket, method, subId, value);
    }
  });
};

export default function update ({ blocks }: ChainInterface, subscriptions: Subscriptions, sockets: Sockets): void {
  blocks.block.onUpdate((header: Uint8Array): void =>
    updateAll(subscriptions, sockets, 'chain_newHead', jsonHeader(decodeHeader(header)))
  );
}
