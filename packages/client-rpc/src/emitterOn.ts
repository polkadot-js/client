// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RpcState, RpcInterface$Events } from './types';

type EmitterOn = (type: RpcInterface$Events, cb: () => any) => any;

export default function emitterOn (self: RpcState): EmitterOn {
  return (type: RpcInterface$Events, cb: () => any): any =>
    self.emitter.on(type, cb);
}
