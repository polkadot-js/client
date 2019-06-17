// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DiskDbOptions } from '../../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import Cache from './Cache';
import defaults from './defaults';

type Fd = {
  cache: Cache<number>,
  fd: number,
  file: string,
  size: number
};

type Fds = {
  idx: Fd,
  key: Fd,
  val: Fd
};

const CACHE_SIZES = {
  idx: 8 * 1024,
  key: 6 * 1024,
  val: 4 * 1024
};

export default class Files {
  protected _isTrie: boolean = false;
  protected _isOpen: boolean = false;
  private _fds: Array<Fds> = [];
  private _path: string;

  constructor (base: string, file: string, options: DiskDbOptions) {
    this._isTrie = options.isTrie;
    this._path = path.join(base, file);

    mkdirp.sync(this._path);
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
    for (let i = 0; i < defaults.HDR_SPLIT_FILES; i++) {
      this._fds[i] = (['idx', 'key', 'val'] as Array<keyof Fds>).reduce((fds, type) => {
        const prefix = `0${i.toString(16)}`.slice(-2);
        const file = path.join(this._path, `${defaults.VERSION}.${prefix}.${type as string}`);

        if (!fs.existsSync(file)) {
          fs.writeFileSync(file, new Uint8Array(
            type === 'idx'
              ? defaults.HDR_TOTAL_SIZE
              : type === 'key'
                ? defaults.KEY_TOTAL_SIZE
                : 0
          ));
        }

        const cache = new Cache<number>(CACHE_SIZES[type]);
        const fd = fs.openSync(file, 'r+');
        const size = fs.fstatSync(fd).size;

        fds[type] = { cache, fd, file, size };

        return fds;
      }, {} as Fds);
    }
  }

  private __append (type: keyof Fds, index: number, buffer: Uint8Array): number {
    const fd = this._fds[index][type];
    const offset = fd.size;

    fs.writeSync(fd.fd, buffer, 0, buffer.length, offset);
    fd.size += buffer.length;
    fd.cache.set(offset, buffer);

    return offset;
  }

  private __read (type: keyof Fds, index: number, offset: number, length: number): Uint8Array {
    const fd = this._fds[index][type];
    const cached = fd.cache.get(offset);

    if (cached) {
      return cached;
    }

    const buffer = new Uint8Array(length);

    fs.readSync(fd.fd, buffer, 0, length, offset);
    fd.cache.set(offset, buffer);

    return buffer;
  }

  private __update (type: keyof Fds, index: number, offset: number, buffer: Uint8Array): number {
    const fd = this._fds[index][type];

    fs.writeSync(fd.fd, buffer, 0, buffer.length, offset);
    fd.cache.set(offset, buffer);

    return offset;
  }

  protected _appendHdr (index: number, buffer: Uint8Array): number {
    return this.__append('idx', index, buffer) / defaults.HDR_TOTAL_SIZE;
  }

  protected _appendKey (index: number, buffer: Uint8Array): number {
    return this.__append('key', index, buffer) / defaults.KEY_TOTAL_SIZE;
  }

  protected _appendVal (index: number, buffer: Uint8Array): number {
    return this.__append('val', index, buffer);
  }

  protected _readHdr (index: number, offset: number): Uint8Array {
    return this.__read('idx', index, offset * defaults.HDR_TOTAL_SIZE, defaults.HDR_TOTAL_SIZE);
  }

  protected _readKey (index: number, offset: number): Uint8Array {
    return this.__read('key', index, offset * defaults.KEY_TOTAL_SIZE, defaults.KEY_TOTAL_SIZE);
  }

  protected _readVal (index: number, offset: number, length: number): Uint8Array {
    return this.__read('val', index, offset, length);
  }

  protected _updateHdr (index: number, offset: number, buffer: Uint8Array): number {
    return this.__update('idx', index, offset * defaults.HDR_TOTAL_SIZE, buffer) / defaults.HDR_ENTRY_SIZE;
  }

  protected _updateKey (index: number, offset: number, buffer: Uint8Array): number {
    return this.__update('key', index, offset * defaults.KEY_TOTAL_SIZE, buffer) / defaults.KEY_TOTAL_SIZE;
  }
}
