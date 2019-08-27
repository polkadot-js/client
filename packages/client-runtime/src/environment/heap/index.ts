// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnvHeap, Pointer } from '../../types';
import { Memory, SizeUsed } from './types';

import { ExtError, isUndefined, logger } from '@polkadot/util';

const PAGE_SIZE = 64 * 1024;

const l = logger('runtime/heap');

export default class Heap implements RuntimeEnvHeap {
  private memory: Memory;

  private wasmMemory?: WebAssembly.Memory;

  public constructor () {
    this.memory = this.createMemory(new ArrayBuffer(0), 0);
  }

  public wasResized (): boolean {
    return this.memory.isResized;
  }

  public allocate (size: number): Pointer {
    if (size === 0) {
      return 0;
    }

    const ptr = this.memory.offset;
    const offset = ptr + size;

    if (offset < this.memory.size) {
      this.memory.offset = offset;
      this.memory.allocated.set(ptr, size);

      return ptr;
    }

    return this.freealloc(size);
  }

  public deallocate (ptr: Pointer): number {
    const size = this.memory.allocated.get(ptr);

    if (isUndefined(size)) {
      throw new ExtError('Calling free() on unallocated memory');
    }

    this.memory.allocated.delete(ptr);
    this.memory.deallocated.set(ptr, size);
    // this.memory.uint8.fill(0, ptr, size);

    return size;
  }

  public dup (ptr: Pointer, len: number): Uint8Array {
    return this.memory.uint8.slice(ptr, ptr + len);
  }

  public fill (ptr: Pointer, value: number, len: number): Uint8Array {
    return this.memory.uint8.fill(value, ptr, ptr + len);
  }

  public freealloc (size: number): Pointer {
    const ptr = this.findContaining(size);

    if (ptr === -1) {
      l.warn(`allocate(${size}) failed, consider increasing the base runtime memory size`);

      return this.growalloc(size);
    }

    // FIXME: We are being wasteful here, i.e. we should just un-free the requested size instead of everything (long-term fragmentation and loss)
    this.memory.deallocated.delete(ptr);
    this.memory.allocated.set(ptr, size);

    return ptr;
  }

  public growalloc (size: number): Pointer {
    // grow memory by 4 times the requested amount (rounded up)
    return this.growMemory(1 + Math.ceil(4 * size / PAGE_SIZE))
      ? this.allocate(size)
      : 0;
  }

  public get (ptr: Pointer, len: number): Uint8Array {
    return this.memory.uint8.subarray(ptr, ptr + len);
  }

  public getU32 (ptr: Pointer): number {
    return this.memory.view.getUint32(ptr, true);
  }

  public set (ptr: Pointer, data: Uint8Array): Pointer {
    this.memory.uint8.set(data, ptr);

    return ptr;
  }

  public setU32 (ptr: Pointer, value: number): Pointer {
    this.memory.view.setUint32(ptr, value, true);

    return ptr;
  }

  public setWasmMemory (wasmMemory: WebAssembly.Memory, pageOffset: number = 4): void {
    const offset = pageOffset * PAGE_SIZE;

    this.wasmMemory = wasmMemory;
    this.memory = this.createMemory(wasmMemory.buffer, offset);
  }

  public size (): number {
    return this.memory.size;
  }

  public used (): SizeUsed {
    return {
      allocated: this.calculateSize(this.memory.allocated),
      deallocated: this.calculateSize(this.memory.deallocated)
    };
  }

  private calculateSize (buffer: Map<number, number>): number {
    let total = 0;

    buffer.forEach((size): void => {
      total += size;
    });

    return total;
  }

  private growMemory (pages: number): boolean {
    if (!this.wasmMemory) {
      return false;
    }

    l.debug((): string => `Growing allocated memory by ${pages * 64}KB`);

    this.wasmMemory.grow(pages);
    this.memory.size = this.wasmMemory.buffer.byteLength;
    this.memory.uint8 = new Uint8Array(this.wasmMemory.buffer);
    this.memory.view = new DataView(this.memory.uint8.buffer);
    this.memory.isResized = true;

    return true;
  }

  private createMemory (buffer: ArrayBuffer, offset: number = 256 * 1024): Memory {
    const size = buffer.byteLength;
    const uint8 = new Uint8Array(buffer);

    // NOTE clear memory, it could be provided from a previous run
    uint8.fill(0, offset, size);

    // l.debug(() => `Creating WASM memory wrap, ${(size - offset) / 1024}KB`);

    return {
      allocated: new Map<number, number>(),
      deallocated: new Map<number, number>(),
      isResized: false,
      offset, // aligned with Rust (should have offset)
      size,
      uint8,
      view: new DataView(uint8.buffer)
    };
  }

  private findContaining (total: number): Pointer {
    const [ptr] = [...this.memory.deallocated.entries()]
      .filter(([, size]): boolean => size >= total)
      .sort((a: [number, number], b: [number, number]): number => {
        if (a[1] < b[1]) {
          return -1;
        } else if (a[1] > b[1]) {
          return 1;
        }

        return 0;
      });

    return ptr
      ? ptr[0]
      : -1;
  }
}
