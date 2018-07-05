// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '../types';
import { Message, MessageData, MessageType, MessageTypeRead, MessageTypeWrite } from './types';

import path from 'path';
import { Worker } from 'worker_threads';
import promisify from '@polkadot/util/promisify';

import commands from './commands';

export default class SyncDb implements TrieDb {
  private child: WorkerThreads.Worker;

  constructor () {
    // FIXME We should probably be passing the trie params info into construction
    // NOTE Some other options for creation exist
    //   1. With --experimental-modules (ESNext targets) this can become
    //      this.child = new Worker(new URL('./worker.js', import.meta.url).pathname);
    //   2. When using isMainThread, we can construct with __filename
    //   3. With Node 10.6 onwards, relative paths are supported
    this.child = new Worker(path.join(__dirname, './worker.js'));
  }

  checkpoint (): void {
    this._executeWrite('checkpoint');
  }

  commit (): void {
    this._executeWrite('commit');
  }

  revert (): void {
    this._executeWrite('revert');
  }

  del (key: Uint8Array): void {
    this._executeWrite('del', key);
  }

  get (key: Uint8Array): Uint8Array | null {
    return this._executeRead('get', key);
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this._executeWrite('put', key, value);
  }

  trieRoot (): Uint8Array {
    return this._executeRead('root') as Uint8Array;
  }

  async terminate () {
    // TODO We should cleanup the trie instance gracefully, so another message here
    // to cleanup and then the termination up next
    return promisify(this.child, this.child.terminate);
  }

  // Ok, this is not something that returns a value, just send the message and
  // return when we the call has been done
  private _executeWrite (type: MessageTypeWrite, key?: Uint8Array, value?: Uint8Array): void {
    this._waitOnStart(type, {
      key,
      value
    });
  }

  // Sends a message to the worker, reading and returning the actual result
  private _executeRead (type: MessageTypeRead, key?: Uint8Array, value?: Uint8Array): Uint8Array | null {
    // The shared data buffer that will be used by the worker to send info back
    // (wrapped in Uint8Array for binary data or in DataView for Int32 data)
    const shared = new SharedArrayBuffer(4096);
    const buffer = new Uint8Array(shared);
    const state = this._waitOnStart(type, {
      buffer,
      key,
      value
    });
    const size = this._readSize(state, shared);

    if (size === -1) {
      return null;
    }

    return this._readBuffer(state, buffer, size);
  }

  // Sends a message to the worker, waiting until started
  private _waitOnStart (type: MessageType, message: MessageData): Int32Array {
    const state = new Int32Array(new SharedArrayBuffer(8));

    this.child.postMessage({
      ...message,
      state,
      type
    } as Message);

    Atomics.wait(state, 0, commands.START);

    return state;
  }

  // Notifies the worker that it should continue filling the result buffer
  private _waitOnRead (state: Int32Array): void {
    state[0] = commands.FILL;

    // FIXME This is going to be renamed '.notify', not in Node (yet)
    Atomics.wake(state, 0, 1);
    Atomics.wait(state, 0, commands.FILL);
  }

  // Read the size of a structure to be returned from the stream
  private _readSize (state: Int32Array, shared: SharedArrayBuffer): number {
    const view = new DataView(shared);

    // expect to read SIZE, END/ERROR here
    switch (state[0]) {
      case commands.END:
      case commands.ERROR:
        return -1;

      // Ahah, we need to read the size (first result) to detemine how
      // big of a result buffer we need.
      case commands.SIZE:
        return view.getUint32(0);

      // This _should_ never happen... but...
      default:
        throw new Error(`Unknown worker state waiting for size, ${state[0]}`);
    }
  }

  // Read the full data buffer from the worker
  private _readBuffer (state: Int32Array, buffer: Uint8Array, size: number): Uint8Array | null {
    const result = new Uint8Array(size);
    let available = 0;
    let written = 0;

    // Here we loop through the states and either read data to fill the buffer
    // or return when it is time to do so
    while (written !== size) {
      this._waitOnRead(state);

      switch (state[0]) {
        // Error, so just return a null for the caller to handle
        case commands.ERROR:
          return null;

        // Get the available data from the buffer and write it into our result
        // array.
        case commands.END:
        case commands.READ:
          available = Math.min(buffer.length, size - written);
          result.set(buffer.subarray(0, available), written);
          written += available;
          break;

        // This _should_ never happen... but...
        default:
          throw new Error(`Unknown worker state waiting for read, ${state[0]}`);
      }
    }

    return result;
  }
}
