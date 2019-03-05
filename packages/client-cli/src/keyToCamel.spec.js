// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import keyToCamel from './keyToCamel';

describe('keyToCamel', () => {
  it('formats everything by default', () => {
    expect(
      keyToCamel('foo-bar-baz-doh')
    ).toEqual('fooBarBazDoh');
  });

  it('returns multi"-" formatted (offset specified)', () => {
    expect(
      keyToCamel('foo-bar-baz-doh', 1)
    ).toEqual('barBazDoh');
  });
});
