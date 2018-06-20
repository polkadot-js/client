// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import isU8a from '@polkadot/util/is/u8a';

import status from '../message/status';
import encode from './encode';

describe('encode', () => {
  let message;

  beforeEach(() => {
    message = status({});
  });

  it('returns an encoded Uint8Array', () => {
    expect(
      isU8a(
        encode(message)
      )
    ).toEqual(true);
  });
});
