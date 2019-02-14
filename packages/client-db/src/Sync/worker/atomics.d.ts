// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

declare type Notifiers = {
  notify (state: Int32Array, command: number): void,
  notifyOnDone (state: Int32Array, fn: () => Promise<any>): Promise<void>,
  notifyOnValue (state: Int32Array, buffer: Uint8Array, fn: () => Promise<Uint8Array | null>): Promise<void>,
  wait (state: Int32Array, command: number): void
}

declare const notifiers: Notifiers;

export = notifiers;
