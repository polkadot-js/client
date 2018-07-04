// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '../types';

import path from 'path';
import { Worker } from 'worker_threads';
import logger from '@polkadot/util/logger';
import promisify from '@polkadot/util/promisify';
// import u8aToHex from '@polkadot/util/u8a/toHex';

import commands from './commands';

const l = logger('db/main');

const U32_MAX = 4294967295;
const returnable = ['get', 'root'];

export default class SyncDb implements TrieDb {
  private child: WorkerThreads.Worker;

  constructor () {
    // NOTE With --experimental-modules (ESNext targets) this can become
    // this.child = new Worker(new URL('./worker.js', import.meta.url).pathname);
    this.child = new Worker(path.join(__dirname, './worker.js'));
  }

  private _notifyFill (state: Int32Array): void {
    state[0] = commands.FILL;

    Atomics.wake(state, 0, +Infinity);
    Atomics.wait(state, 0, commands.FILL);
  }

  private _sendMessage (type: string, key?: Uint8Array, value?: Uint8Array): Uint8Array | null {
    const state = new Int32Array(new SharedArrayBuffer(8));
    let view: DataView | null = null;
    let buffer: Uint8Array | null = null;

    const start = () => {
      state[0] = commands.START;
      this.child.postMessage({
        buffer,
        key,
        state,
        value,
        type
      });

      Atomics.wait(state, 0, commands.START);
    };

    if (!returnable.includes(type)) {
      start();
      return null;
    }

    const shared = new SharedArrayBuffer(4096);

    buffer = new Uint8Array(shared);
    view = new DataView(shared);

    let result: Uint8Array | null = null;
    let size = 0;
    let offset = 0;

    start();

    while (true) {
      switch (state[0]) {
        case commands.END:
          return result;

        case commands.ERROR:
          return null;

        case commands.SIZE:
          size = view.getUint32(0);

          if (size === U32_MAX) {
            return null;
          }

          result = new Uint8Array(size);

          this._notifyFill(state);
          break;

        case commands.READ:
          const available = Math.min(buffer.length, size - offset);

          (result as Uint8Array).set(buffer.subarray(0, available), offset);
          offset += available;

          this._notifyFill(state);
          break;

        default:
          l.error('Unknown worker state', state[0]);
          return null;
      }
    }
  }

  checkpoint () {
    this._sendMessage('checkpoint');
  }

  commit () {
    this._sendMessage('commit');
  }

  revert () {
    this._sendMessage('revert');
  }

  del (key: Uint8Array): void {
    this._sendMessage('del', key);
  }

  get (key: Uint8Array): Uint8Array | null {
    return this._sendMessage('get', key);
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this._sendMessage('put', key, value);
  }

  trieRoot (): Uint8Array {
    return this._sendMessage('root') as Uint8Array;
  }

  async terminate () {
    return promisify(this.child, this.child.terminate);
  }
}
