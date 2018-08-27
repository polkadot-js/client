// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RuntimeEnv$Heap, Pointer } from '../../types';
import { Memory, Memory$Buffer, SizeUsed } from './types';

import ExtError from '@polkadot/util/ext/error';
import isUndefined from '@polkadot/util/is/undefined';
import logger from '@polkadot/util/logger';

const PAGE_SIZE = 64 * 1024;

const l = logger('runtime/heap');

export default class Heap implements RuntimeEnv$Heap {
  private memory: Memory;
  private wasmMemory?: WebAssembly.Memory;

  constructor () {
    this.memory = this.createMemory(new ArrayBuffer(0), 0);
  }

  allocate (size: number): Pointer {
    if (size === 0) {
      return 0;
    }

    const ptr = this.memory.offset;
    const offset = ptr + size;

    if (offset < this.memory.size) {
      this.memory.offset = offset;
      this.memory.allocated[ptr] = size;

      return ptr;
    }

    return this.freealloc(size);
  }

  deallocate (ptr: Pointer): number {
    const size = this.memory.allocated[ptr];

    if (isUndefined(size)) {
      throw new ExtError('Calling free() on unallocated memory');
    }

    delete this.memory.allocated[ptr];

    this.memory.deallocated[ptr] = size;
    // this.memory.uint8.fill(0, ptr, size);

    return size;
  }

  dup (ptr: Pointer, len: number): Uint8Array {
    return this.memory.uint8.slice(ptr, ptr + len);
  }

  fill (ptr: Pointer, value: number, len: number): Uint8Array {
    return this.memory.uint8.fill(value, ptr, ptr + len);
  }

  freealloc (size: number): Pointer {
    const ptr = this.findContaining(size);

    if (ptr === -1) {
      l.warn(`allocate(${size}) failed, consider increasing the base runtime memory size`);

      return this.growalloc(size);
    }

    // FIXME: We are being wasteful here, i.e. we should just un-free the requested size instead of everything (long-term fragmentation and loss)
    delete this.memory.deallocated[ptr];
    this.memory.allocated[ptr] = size;

    return ptr;
  }

  growalloc (size: number): Pointer {
    // grow memory by 4 times the requested amount (rounded up)
    return this.growMemory(1 + Math.ceil(4 * size / PAGE_SIZE))
      ? this.allocate(size)
      : 0;
  }

  get (ptr: Pointer, len: number): Uint8Array {
    return this.memory.uint8.subarray(ptr, ptr + len);
  }

  getU32 (ptr: Pointer): number {
    return this.memory.view.getUint32(ptr, true);
  }

  set (ptr: Pointer, data: Uint8Array): Pointer {
    this.memory.uint8.set(data, ptr);

    return ptr;
  }

  setU32 (ptr: Pointer, value: number): Pointer {
    this.memory.view.setUint32(ptr, value, true);

    return ptr;
  }

  setWasmMemory (wasmMemory: WebAssembly.Memory, pageOffset: number = 4): void {
    const offset = pageOffset * PAGE_SIZE;

    this.wasmMemory = wasmMemory;
    this.memory = this.createMemory(wasmMemory.buffer, offset);
  }

  size (): number {
    return this.memory.size;
  }

  used (): SizeUsed {
    return {
      allocated: this.calculateSize(this.memory.allocated),
      deallocated: this.calculateSize(this.memory.deallocated)
    };
  }

  private calculateSize (buffer: Memory$Buffer): number {
    return Object
      .values(buffer)
      .reduce((total, size) => total + (size), 0);
  }

  private growMemory (pages: number): boolean {
    if (!this.wasmMemory) {
      return false;
    }

    l.debug(() => `Growing allocated memory by ${pages * 64}KB`);

    this.wasmMemory.grow(pages);
    this.memory.size = this.wasmMemory.buffer.byteLength;
    this.memory.uint8 = new Uint8Array(this.wasmMemory.buffer);
    this.memory.view = new DataView(this.memory.uint8.buffer);

    return true;
  }

  private createMemory (buffer: ArrayBuffer, offset: number = 256 * 1024): Memory {
    const size = buffer.byteLength;
    const uint8 = new Uint8Array(buffer);

    // l.debug(() => `Creating WASM memory wrap, ${(size - offset) / 1024}KB`);

    return {
      allocated: {},
      deallocated: {},
      offset, // aligned with Rust (should have offset)
      size,
      uint8,
      view: new DataView(uint8.buffer)
    };
  }

  private findContaining (size: number): Pointer {
    const [ptr] = Object
      .keys(this.memory.deallocated)
      .filter((offset) =>
        this.memory.deallocated[offset as any] >= size
      )
      .sort((a: any, b: any) => {
        const sizeA = this.memory.deallocated[a];
        const sizeB = this.memory.deallocated[b];

        if (sizeA < sizeB) {
          return -1;
        } else if (sizeA > sizeB) {
          return 1;
        }

        return 0;
      });

    if (ptr) {
      return parseInt(ptr, 10);
    }

    return -1;
  }
}
