// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';

import HashDb from './Hash/Memory';

describe('HashDb', () => {
  const key = toU8a('hello');
  const value = toU8a('world');

  let memory = new HashDb();

  it('has the correct value after a single insertion', () => {
    memory.put(key, value);

    expect(
      memory.get(key)
    ).toEqual(
      value
    );
  });

  it('has no value after a deletion', () => {
    memory.del(key);

    expect(
      memory.get(key)
    ).toEqual(
      null
    );
  });

  it('has the correct value after a re-insertion', () => {
    memory.put(key, value);

    expect(
      memory.get(key)
    ).toEqual(
      value
    );
  });

  it('has the correct value after an override', () => {
    const mars = toU8a('mars');
    memory.put(key, mars);

    expect(
      memory.get(key)
    ).toEqual(
      mars
    );
  });

  it('terminates', () => {
    return memory.terminate();
  });
});
