// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DiskDbOptions } from '../../types';

import fs from 'fs';
import { LRUMap } from 'lru_map';
import mkdirp from 'mkdirp';
import path from 'path';
import { assert } from '@polkadot/util';

import defaults from './defaults';

type Fds = {
  idx: { fd: number, file: string, size: number },
  key: { fd: number, file: string, size: number },
  val: { fd: number, file: string, size: number }
};

const LRU_IDX_SIZE = 2048;

export default class File {
  protected _isTrie: boolean = false;
  protected _isOpen: boolean = false;
  private _fds: Array<Fds> = [];
  private _lru: { [index: number]: LRUMap<number,Uint8Array> } = {};
  private _path: string;

  constructor (base: string, file: string, options: DiskDbOptions) {
    this._isTrie = options.isTrie;
    this._path = path.join(base, file);

    mkdirp.sync(this._path);
  }

  protected assertOpen (isOpen: boolean = true): void {
    assert(isOpen === this._isOpen, `Expected ${isOpen ? 'an open' : 'a closed'} database`);
  }

  close (): void {
    this._fds.forEach((fds) =>
      Object.values(fds).forEach(({ fd }) =>
        fs.closeSync(fd)
      )
    );

    this._isOpen = false;
  }

  open (): void {
    for (let i = 0; i < defaults.HDR_ENTRY_NUM; i++) {
      this._lru[i] = new LRUMap(LRU_IDX_SIZE);
      this._fds[i] = (['idx', 'key', 'val'] as Array<keyof Fds>).reduce((fds, type) => {
        const file = path.join(this._path, `${i.toString(16)}.${type as string}`);

        if (!fs.existsSync(file)) {
          fs.writeFileSync(file, new Uint8Array(type === 'idx' ? defaults.HDR_TOTAL_SIZE : 0));
        }

        const fd = fs.openSync(file, 'r+');
        const size = fs.fstatSync(fd).size;

        fds[type] = { fd, file, size };

        return fds;
      }, {} as Fds);
    }
  }

  protected __append (type: keyof Fds, index: number, buffer: Uint8Array): number {
    const offset = this._fds[index][type].size;

    fs.writeSync(this._fds[index][type].fd, buffer, 0, buffer.length, offset);

    this._fds[index][type].size += buffer.length;

    return offset;
  }

  protected __read (type: keyof Fds, index: number, offset: number, length: number): Uint8Array {
    const buffer = new Uint8Array(length);

    fs.readSync(this._fds[index][type].fd, buffer, 0, length, offset);

    return buffer;
  }

  protected __update (type: keyof Fds, index: number, offset: number, buffer: Uint8Array): number {
    fs.writeSync(this._fds[index][type].fd, buffer, 0, buffer.length, offset);

    return offset;
  }

  protected __updatePartial (type: keyof Fds, index: number, offset: number, buffer: Uint8Array, writeOffset: number, writeLength: number): void {
    fs.writeSync(this._fds[index][type].fd, buffer, writeOffset, writeLength, offset + writeOffset);
  }

  protected _appendHdr (index: number, buffer: Uint8Array): number {
    const offset = this.__append('idx', index, buffer) / defaults.HDR_TOTAL_SIZE;

    this._lru[index].set(offset, buffer);

    return offset;
  }

  protected _appendKey (index: number, buffer: Uint8Array): number {
    return this.__append('key', index, buffer) / defaults.KEY_TOTAL_SIZE;
  }

  protected _appendVal (index: number, buffer: Uint8Array): number {
    return this.__append('val', index, buffer);
  }

  protected _readHdr (index: number, offset: number): Uint8Array {
    const cached = this._lru[index].get(offset);

    if (cached) {
      return cached;
    }

    const buffer = this.__read('idx', index, offset * defaults.HDR_TOTAL_SIZE, defaults.HDR_TOTAL_SIZE);

    this._lru[index].set(offset, buffer);

    return buffer;
  }

  protected _readKey (index: number, offset: number): Uint8Array {
    return this.__read('key', index, offset * defaults.KEY_TOTAL_SIZE, defaults.KEY_TOTAL_SIZE);
  }

  protected _readVal (index: number, offset: number, length: number): Uint8Array {
    return this.__read('val', index, offset, length);
  }

  protected _updateHdrPartial (index: number, offset: number, buffer: Uint8Array, hdrIndex: number): void {
    this.__updatePartial('idx', index, offset * defaults.HDR_TOTAL_SIZE, buffer, defaults.HDR_ENTRY_SIZE * hdrIndex, defaults.HDR_ENTRY_SIZE);
  }

  protected _updateKey (index: number, offset: number, buffer: Uint8Array): number {
    return this.__update('key', index, offset * defaults.KEY_TOTAL_SIZE, buffer) / defaults.KEY_TOTAL_SIZE;
  }
}
