/* eslint-disable @typescript-eslint/camelcase */
// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import { logger } from '@polkadot/util';

import index from '.';

const l = logger('test');

describe('get_storage_into', () => {
  let heap;
  let stateDb;
  let get_storage_into;

  beforeEach(() => {
    const uint8 = new Uint8Array([0xff, 0x53, 0x61, 0x79, 0x48, 0x65, 0x6c, 0x6c, 0x6f]);

    heap = {
      get: (ptr, len) => {
        return ptr !== -1
          ? uint8.subarray(ptr, ptr + len)
          : new Uint8Array(0);
      },
      set: jest.fn()
    };

    stateDb = {
      db: {
        get: jest.fn((key) => {
          return key[0] !== 0xff
            ? new Uint8Array([0x1, 0x2, 0x3, 0x4, 0x5])
            : new Uint8Array(20);
        })
      }
    };

    get_storage_into = index({ l, heap, stateDb }).get_storage_into;
  });

  it('retrieves the correct value from storage', () => {
    get_storage_into(1, 3, 3, 3, 0);

    expect(
      stateDb.db.get
    ).toHaveBeenCalledWith(
      new Uint8Array([0x53, 0x61, 0x79])
    );
  });

  it('retrieves the full value when length >= available', () => {
    expect(
      get_storage_into(1, 0, 3, 10, 0)
    ).toEqual(5);
    expect(
      heap.set
    ).toHaveBeenCalledWith(3, new Uint8Array([0x1, 0x2, 0x3, 0x4, 0x5]));
  });

  it('retrieves a partial value when length < available', () => {
    expect(
      get_storage_into(1, 0, 3, 3, 0)
    ).toEqual(3);
    expect(
      heap.set
    ).toHaveBeenCalledWith(3, new Uint8Array([0x1, 0x2, 0x3]));
  });

  it('retrieves a partial value with offset', () => {
    expect(
      get_storage_into(1, 0, 3, 13, 2)
    ).toEqual(3);
    expect(
      heap.set
    ).toHaveBeenCalledWith(3, new Uint8Array([0x3, 0x4, 0x5]));
  });

  it('retrieves zero value when not available', () => {
    expect(
      get_storage_into(0, 3, 3, 5, 0)
    ).toEqual(5);
    expect(
      heap.set
    ).toHaveBeenCalledWith(3, new Uint8Array(5));
  });
});
