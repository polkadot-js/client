// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb, DbConfig$Type } from '../types';
import { Message, MessageData, MessageType, MessageTypeRead, MessageTypeWrite } from './types';

import path from 'path';
import { Worker } from 'worker_threads';
// import promisify from '@polkadot/util/promisify';

import commands from './worker/commands';

const emptyBuffer = new Uint8Array();

export default class SyncDb implements TrieDb {
  private worker: WorkerThreads.Worker;

  constructor (type: DbConfig$Type = 'memory', dbPath: string = '.') {
    // NOTE Node 10.6 relative paths for Workers are broken - adding here tries to load
    // the worker from /client, not client-db.
    this.worker = new Worker(
      path.join(__dirname, './worker/index.js'),
      {
        workerData: {
          path: dbPath,
          type
        }
      }
    );
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

  getRoot (): Uint8Array {
    return this._executeRead('getRoot') as Uint8Array;
  }

  setRoot (value: Uint8Array): void {
    this._executeWrite('setRoot', undefined, value);
  }

  async terminate () {
    this.worker.unref();
    this.worker = null;
    // TODO We should cleanup the trie instance gracefully, so another message here
    // to cleanup and then the termination up next
    // return promisify(this.worker, this.worker.terminate);
  }

  // Sends a message to the worker, waiting until started
  private _waitOnStart (type: MessageType, message: MessageData): Int32Array {
    console.error('_waitOnStart', type);
    const state = new Int32Array(new SharedArrayBuffer(8));

    console.error('state', state);

    this.worker.postMessage({
      ...message,
      state,
      type
    } as Message);

    Atomics.wait(state, 0, commands.START, 5000);

    console.error('_waitOnStart', type, 'started');

    return state;
  }

  // Notifies the worker that it should continue filling the result buffer
  private _waitOnRead (state: Int32Array): void {
    console.error('_waitOnRead');
    state[0] = commands.FILL;

    // @ts-ignore Node is a bit ahead, still to be renamed
    Atomics.notify(state, 0, 1);
    Atomics.wait(state, 0, commands.FILL);
  }

  // Ok, this is not something that returns a value, just send the message and
  // return when we the call has been done
  private _executeWrite (type: MessageTypeWrite, key?: Uint8Array, value?: Uint8Array): void {
    console.error('_executeWrite', type);
    this._waitOnStart(type, {
      buffer: emptyBuffer,
      key,
      value
    });
  }

  // Sends a message to the worker, reading and returning the actual result
  private _executeRead (type: MessageTypeRead, key?: Uint8Array, value?: Uint8Array): Uint8Array | null {
    console.error('_executeRead', type);
    // The shared data buffer that will be used by the worker to send info back
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

  // Read the size of a structure to be returned from the stream
  private _readSize (state: Int32Array, shared: SharedArrayBuffer): number {
    console.error('_readSize');
    const view = new DataView(shared);

    // expect to read SIZE, END/ERROR here
    switch (state[0]) {
      case commands.END:
      case commands.ERROR:
        return -1;

      // Read the size to detemine how big of a result buffer we need.
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
