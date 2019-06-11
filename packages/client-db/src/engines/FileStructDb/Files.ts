// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DiskDbOptions } from '../../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { assert } from '@polkadot/util';

import defaults from './defaults';

type Fds = {
  idx: { fd: number, file: string, size: number },
  key: { fd: number, file: string, size: number },
  val: { fd: number, file: string, size: number }
};

export default class File {
  protected _isCompressed: boolean;
  protected _isTrie: boolean = false;
  protected _isOpen: boolean = false;
  protected _fds: Array<Fds> = [];
  protected _path: string;
  protected _file: string;

  constructor (base: string, file: string, options: DiskDbOptions) {
    this._isCompressed = options.isCompressed;
    this._isTrie = options.isTrie;
    this._file = file;
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
    const max = defaults.HDR_ENTRY_NUM * defaults.HDR_ENTRY_NUM;

    for (let i = 0; i < max; i++) {
      this._fds[i] = (['idx', 'key', 'val'] as Array<keyof Fds>).reduce((fds, type) => {
        const file = path.join(this._path, `${i.toString(16)}.${type as string}`);

        if (!fs.existsSync(file)) {
          fs.writeFileSync(file, Buffer.alloc(type === 'idx' ? defaults.HDR_SIZE : 0));
        }

        const fd = fs.openSync(file, 'r+');
        const size = fs.fstatSync(fd).size;

        fds[type] = { fd, file, size };

        return fds;
      }, {} as Fds);
    }
  }

  protected __append (type: keyof Fds, index: number, buffer: Buffer): number {
    const offset = this._fds[index][type].size;

    fs.writeSync(this._fds[index][type].fd, buffer, 0, buffer.length, offset);

    this._fds[index][type].size += buffer.length;

    return offset;
  }

  protected __read (type: keyof Fds, index: number, offset: number, length: number): Buffer {
    const buffer = Buffer.alloc(length);

    fs.readSync(this._fds[index][type].fd, buffer, 0, length, offset);

    return buffer;
  }

  protected __update (type: keyof Fds, index: number, offset: number, buffer: Buffer): number {
    fs.writeSync(this._fds[index][type].fd, buffer, 0, buffer.length, offset);

    return offset;
  }

  protected __updatePartial (type: keyof Fds, index: number, offset: number, buffer: Buffer, writeOffset: number, writeLength: number): void {
    fs.writeSync(this._fds[index][type].fd, buffer, writeOffset, writeLength, offset + writeOffset);
  }

  protected _appendHdr (index: number, buffer: Buffer): number {
    return this.__append('idx', index, buffer);
  }

  protected _appendKey (index: number, buffer: Buffer): number {
    return this.__append('key', index, buffer);
  }

  protected _appendVal (index: number, buffer: Buffer): number {
    return this.__append('val', index, buffer);
  }

  protected _readHdr (index: number, offset: number): Buffer {
    return this.__read('idx', index, offset, defaults.HDR_SIZE);
  }

  protected _readKey (index: number, offset: number): Buffer {
    return this.__read('key', index, offset, defaults.KEY_TOTAL_SIZE);
  }

  protected _readVal (index: number, offset: number, length: number): Buffer {
    return this.__read('val', index, offset, length);
  }

  protected _updateHdrPartial (index: number, offset: number, buffer: Buffer, hdrIndex: number): void {
    return this.__updatePartial('idx', index, offset, buffer, defaults.HDR_ENTRY_SIZE * hdrIndex, defaults.HDR_ENTRY_SIZE);
  }

  protected _updateKey (index: number, offset: number, buffer: Buffer): number {
    return this.__update('key', index, offset, buffer);
  }
}
