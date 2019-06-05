// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '@polkadot/db/types';

import { logger } from '@polkadot/util';

import Impl from './Impl';
import { deserializeValue, serializeKey, serializeValue } from './util';

const l = logger('db/struct');

export default class FileStructDb extends Impl implements BaseDb {
  drop (): void {
    l.error('drop() is not implemented');
  }

  empty (): void {
    l.error('empty() is not implemented');
  }

  rename (base: string, file: string): void {
    l.error('rename() is not implemented');
  }

  size (): number {
    l.error('size() is not implemented');

    return 0;
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: 0,
      percent: 100
    });
  }

  del (key: Uint8Array): void {
    l.error('del() is not implemented');
  }

  get (key: Uint8Array): Uint8Array | null {
    l.debug(() => ['get', { key }]);

    const keyInfo = this._findValue(serializeKey(key));

    return !keyInfo
      ? null
      : deserializeValue(keyInfo.valData);
  }

  put (key: Uint8Array, value: Uint8Array): void {
    l.debug(() => ['set', { key, value }]);

    this._findValue(serializeKey(key), serializeValue(value));
  }
}
