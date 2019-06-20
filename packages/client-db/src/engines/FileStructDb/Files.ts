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

const DB_VERSION = '005';
const DB_MAX_FILES = 256;

const CACHE_SIZES = {
  idx: 3 * 256,
  key: 2 * 256,
  val: 1 * 256
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
    for (let i = 0; i < DB_MAX_FILES; i++) {
      this._fds[i] = (['idx', 'key', 'val'] as Array<keyof Fds>).reduce((fds, type) => {
        const count = `0${i.toString(16)}`.slice(-2);
        const file = path.join(this._path, `${DB_VERSION}.${count}.${type as string}`);

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
  }

  private __append (index: number, type: keyof Fds, buffer: Uint8Array): number {
    const fd = this._fds[index][type];
    const at = fd.size;

    fs.writeSync(fd.fd, buffer, 0, buffer.length, at);
    fd.size += buffer.length;
    fd.cache.set(at, buffer);

    return at;
  }

  private __read (index: number, type: keyof Fds, at: number, length: number): Uint8Array {
    const fd = this._fds[index][type];
    const cached = fd.cache.get(at);

    if (cached) {
      return cached;
    }

    const buffer = new Uint8Array(length);

    fs.readSync(fd.fd, buffer, 0, length, at);
    fd.cache.set(at, buffer);

    return buffer;
  }

  private __update (index: number, type: keyof Fds, at: number, buffer: Uint8Array): number {
    const fd = this._fds[index][type];

    fs.writeSync(fd.fd, buffer, 0, buffer.length, at);
    fd.cache.set(at, buffer);

    return at;
  }

  protected _appendHdr (index: number, buffer: Uint8Array): number {
    return this.__append(index, 'idx', buffer) / HDR_TOTAL_SIZE;
  }

  protected _appendKey (index: number, buffer: Uint8Array): number {
    return this.__append(index, 'key', buffer) / KEY_TOTAL_SIZE;
  }

  protected _appendVal (index: number, buffer: Uint8Array): number {
    return this.__append(index, 'val', buffer);
  }

  protected _readHdr (index: number, at: number): Uint8Array {
    return this.__read(index, 'idx', at * HDR_TOTAL_SIZE, HDR_TOTAL_SIZE);
  }

  protected _readKey (index: number, at: number): Uint8Array {
    return this.__read(index, 'key', at * KEY_TOTAL_SIZE, KEY_TOTAL_SIZE);
  }

  protected _readVal (index: number, at: number, length: number): Uint8Array {
    return this.__read(index, 'val', at, length);
  }

  protected _updateHdr (index: number, at: number, buffer: Uint8Array): void {
    this.__update(index, 'idx', at * HDR_TOTAL_SIZE, buffer);
  }

  protected _updateKey (index: number, at: number, buffer: Uint8Array): void {
    this.__update(index, 'key', at * KEY_TOTAL_SIZE, buffer);
  }
}
