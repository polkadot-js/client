// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '../types';
import { Message, MessageType } from './types';

import path from 'path';
import { Worker } from 'worker_threads';
import logger from '@polkadot/util/logger';
import promisify from '@polkadot/util/promisify';
// import u8aToHex from '@polkadot/util/u8a/toHex';

import commands from './commands';

const l = logger('db/main');

const returnable: Array<MessageType> = ['get', 'root'];

export default class SyncDb implements TrieDb {
  private child: WorkerThreads.Worker;

  constructor () {
    // NOTE With --experimental-modules (ESNext targets) this can become
    // this.child = new Worker(new URL('./worker.js', import.meta.url).pathname);
    this.child = new Worker(path.join(__dirname, './worker.js'));
  }

  // Sends a message to the worker, optionally (in the case of get/root) returning the
  // actual result.
  private _sendMessage (type: MessageType, key?: Uint8Array, value?: Uint8Array): Uint8Array | null {
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
      } as Message);

      Atomics.wait(state, 0, commands.START);
    };

    // Ok, this is not something that returns a value, just send the message and
    // return when we the call has been done
    if (!returnable.includes(type)) {
      start();
      return null;
    }

    // The shared data buffer that will be used by the worker to send info back
    // (wrapped in Uint8Array for binary data or in DataView for Int32 data)
    const shared = new SharedArrayBuffer(4096);

    buffer = new Uint8Array(shared);
    view = new DataView(shared);

    let size = 0;
    let offset = 0;

    start();

    // expect to read SIZE, END/ERROR here
    switch (state[0]) {
      case commands.END:
      case commands.ERROR:
        return null;

      // Ahah, we need to read the size (first result) to detemine how
      // big of a result buffer we need.
      case commands.SIZE:
        size = view.getUint32(0);
        this._notifyFill(state);
        break;

      // This _should_ never happen... but...
      default:
        l.error('Unknown worker state', state[0]);
        return null;
    }

    const result: Uint8Array = new Uint8Array(size);

    // Here we loop through the states and either read data to fill the buffer
    // or return when it is time to do so
    while (true) {
      switch (state[0]) {
        // we have reached the end, return what we have
        case commands.END:
          return result;

        // Error, so just return a null for the caller to handle
        case commands.ERROR:
          return null;

        // Get the available data from the buffer and write it into our result
        // array.
        case commands.READ:
          const available = Math.min(buffer.length, size - offset);

          result.set(buffer.subarray(0, available), offset);
          offset += available;
          this._notifyFill(state);
          break;

        // This _should_ never happen... but...
        default:
          l.error('Unknown worker state', state[0]);
          return null;
      }
    }
  }

  // Notifies the worker that it should continue filling the result buffer
  private _notifyFill (state: Int32Array): void {
    state[0] = commands.FILL;

    // FIXME This is going to be renamed '.notify', not in Node (yet)
    Atomics.wake(state, 0, 1);
    Atomics.wait(state, 0, commands.FILL);
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
