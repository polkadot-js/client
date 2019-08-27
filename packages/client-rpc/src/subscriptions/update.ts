// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Sockets, Subscriptions } from './types';

import { BlockData } from '@polkadot/client-types';
import { isUndefined } from '@polkadot/util';

import send from './send';

const updateAll = (subscriptions: Subscriptions, sockets: Sockets, method: string, value: any): void => {
  if (!subscriptions[method]) {
    subscriptions[method] = {
      value,
      subscriptions: []
    };
  } else {
    subscriptions[method].value = value;
  }

  subscriptions[method].subscriptions.forEach((subId): void => {
    const socket = sockets[subId];

    if (socket) {
      send(socket, method, subId, value);
    }
  });
};

export default function update ({ blocks }: ChainInterface, subscriptions: Subscriptions, sockets: Sockets): void {
  if (isUndefined(blocks)) {
    return;
  }

  blocks.blockData.onUpdate((data: Uint8Array): void =>
    updateAll(subscriptions, sockets, 'chain_newHead', new BlockData(data).header.toJSON())
  );
}
