// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { validateHandlers } = require('./index');

describe('validateHandlers', () => {
  it('throws when handlers are empty', () => {
    expect(
      () => validateHandlers()
    ).toThrow(/non-empty handler/);
  });

  it('throws when non-function handlers are found', () => {
    expect(
      () => validateHandlers({
        'brokenA': true,
        'working': () => true,
        'brokenB': 'handler?'
      })
    ).toThrow(/Invalid method handlers found: 'brokenA', 'brokenB'/);
  });
});
