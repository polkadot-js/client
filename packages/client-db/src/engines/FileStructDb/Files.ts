// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DiskDbOptions } from '../../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import Cache from './Cache';
import { DB_VERSION, DB_MAX_FILES, HDR_TOTAL_SIZE, KEY_TOTAL_SIZE } from './constants';

interface Fd {
  cache: Cache<number>;
  fd: number;
  file: string;
  size: number;
}

interface Fds {
  idx: Fd;
  key: Fd;
  val: Fd;
}

const CACHE_SIZES = {
  idx: 6 * 512,
  key: 4 * 512,
  val: 2 * 512
};

export default class Files {
  protected _isTrie: boolean = false;
  protected _isOpen: boolean = false;
  private _fds: Fds[] = [];
  private _path: string;

  constructor (base: string, file: string, options: DiskDbOptions) {
    this._isTrie = options.isTrie;
    this._path = path.join(base, DB_VERSION, file);

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
      this._fds[i] = (['idx', 'key', 'val'] as (keyof Fds)[]).reduce((fds, type) => {
        const count = `0${i.toString(16)}`.slice(-2);
        const file = path.join(this._path, `${count}.${type as string}`);

        if (!fs.existsSync(file)) {
          fs.writeFileSync(file, new Uint8Array(type === 'idx' ? HDR_TOTAL_SIZE : 0));
        }

        const cache = new Cache<number>(CACHE_SIZES[type]);
        const fd = fs.openSync(file, 'r+');
        const size = fs.fstatSync(fd).size;

        fds[type] = { cache, fd, file, size };

        return fds;
      }, {} as Fds);
    }
  }

  private __append (type: keyof Fds, fileAt: number, buffer: Uint8Array): number {
    const fd = this._fds[fileAt][type];
    const at = fd.size;

    fs.writeSync(fd.fd, buffer, 0, buffer.length, at);
    fd.size += buffer.length;
    fd.cache.set(at, buffer);

    return at;
  }

  private __read (type: keyof Fds, fileAt: number, at: number, length: number): Uint8Array {
    const fd = this._fds[fileAt][type];
    const cached = fd.cache.get(at);

    if (cached) {
      return cached;
    }

    const buffer = new Uint8Array(length);

    fs.readSync(fd.fd, buffer, 0, length, at);
    fd.cache.set(at, buffer);

    return buffer;
  }

  private __update (type: keyof Fds, fileAt: number, at: number, buffer: Uint8Array): number {
    const fd = this._fds[fileAt][type];

    fs.writeSync(fd.fd, buffer, 0, buffer.length, at);
    fd.cache.set(at, buffer);

    return at;
  }

  protected _appendHdr (fileAt: number, buffer: Uint8Array): number {
    return this.__append('idx', fileAt, buffer) / HDR_TOTAL_SIZE;
  }

  protected _appendKey (fileAt: number, buffer: Uint8Array): number {
    return this.__append('key', fileAt, buffer) / KEY_TOTAL_SIZE;
  }

  protected _appendVal (fileAt: number, buffer: Uint8Array): number {
    return this.__append('val', fileAt, buffer);
  }

  protected _readHdr (fileAt: number, at: number): Uint8Array {
    return this.__read('idx', fileAt, at * HDR_TOTAL_SIZE, HDR_TOTAL_SIZE);
  }

  protected _readKey (fileAt: number, at: number): Uint8Array {
    return this.__read('key', fileAt, at * KEY_TOTAL_SIZE, KEY_TOTAL_SIZE);
  }

  protected _readVal (fileAt: number, at: number, length: number): Uint8Array {
    return this.__read('val', fileAt, at, length);
  }

  protected _updateHdr (fileAt: number, at: number, buffer: Uint8Array): void {
    this.__update('idx', fileAt, at * HDR_TOTAL_SIZE, buffer);
  }

  protected _updateKey (fileAt: number, at: number, buffer: Uint8Array): void {
    this.__update('key', fileAt, at * KEY_TOTAL_SIZE, buffer);
  }
}
