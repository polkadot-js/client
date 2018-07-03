// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import commands from './commands';
import tester from './test-main';

describe('syncify (test-{main,worker}', () => {
  let test;

  beforeEach(() => {
    test = tester();
  });

  afterEach(() => {
    test.exit();
  });

  it('works for callTimeout (setTimeout)', () => {
    expect(
      test.callTimeout()
    ).toEqual(commands.END);
  });

  it('works for error (immediate)', () => {
    expect(
      test.callError()
    ).toEqual(commands.ERROR);
  });
});
