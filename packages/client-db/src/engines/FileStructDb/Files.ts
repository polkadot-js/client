// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DiskDbOptions } from '../../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import Cache from './Cache';
import { HDR_TOTAL_SIZE, KEY_TOTAL_SIZE } from './defaults';

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

const DB_VERSION = '004';

const CACHE_SIZES = {
  idx: 8 * 1024,
  key: 6 * 1024,
  val: 4 * 1024
};

export default class Files {
  protected _isTrie: boolean = false;
  protected _isOpen: boolean = false;
  private _fds: Fds = {} as Fds;
  private _path: string;

  constructor (base: string, file: string, options: DiskDbOptions) {
    this._isTrie = options.isTrie;
    this._path = path.join(base, file);

    mkdirp.sync(this._path);
  }

  close (): void {
    Object.values(this._fds).forEach(({ fd }) => fs.closeSync(fd));

    this._isOpen = false;
  }

  open (): void {
    this._fds = (['idx', 'key', 'val'] as Array<keyof Fds>).reduce((fds, type) => {
      const file = path.join(this._path, `${DB_VERSION}.00.${type as string}`);

      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, new Uint8Array(
          type === 'idx'
            ? HDR_TOTAL_SIZE
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

  private __append (type: keyof Fds, buffer: Uint8Array): number {
    const fd = this._fds[type];
    const at = fd.size;

    fs.writeSync(fd.fd, buffer, 0, buffer.length, at);
    fd.size += buffer.length;
    fd.cache.set(at, buffer);

    return at;
  }

  private __read (type: keyof Fds, at: number, length: number): Uint8Array {
    const fd = this._fds[type];
    const cached = fd.cache.get(at);

    if (cached) {
      return cached;
    }

    const buffer = new Uint8Array(length);

    fs.readSync(fd.fd, buffer, 0, length, at);
    fd.cache.set(at, buffer);

    return buffer;
  }

  private __update (type: keyof Fds, at: number, buffer: Uint8Array): number {
    const fd = this._fds[type];

    fs.writeSync(fd.fd, buffer, 0, buffer.length, at);
    fd.cache.set(at, buffer);

    return at;
  }

  protected _appendHdr (buffer: Uint8Array): number {
    return this.__append('idx', buffer) / HDR_TOTAL_SIZE;
  }

  protected _appendKey (buffer: Uint8Array): number {
    return this.__append('key', buffer) / KEY_TOTAL_SIZE;
  }

  protected _appendVal (buffer: Uint8Array): number {
    return this.__append('val', buffer);
  }

  protected _readHdr (at: number): Uint8Array {
    return this.__read('idx', at * HDR_TOTAL_SIZE, HDR_TOTAL_SIZE);
  }

  protected _readKey (at: number): Uint8Array {
    return this.__read('key', at * KEY_TOTAL_SIZE, KEY_TOTAL_SIZE);
  }

  protected _readVal (at: number, length: number): Uint8Array {
    return this.__read('val', at, length);
  }

  protected _updateHdr (at: number, buffer: Uint8Array): void {
    this.__update('idx', at * HDR_TOTAL_SIZE, buffer);
  }

  protected _updateKey (at: number, buffer: Uint8Array): void {
    this.__update('key', at * KEY_TOTAL_SIZE, buffer);
  }
}
