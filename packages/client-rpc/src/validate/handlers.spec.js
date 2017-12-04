// ISC, Copyright 2017 Jaco Greeff

const { validateHandlers } = require('./index');

describe('validateHandlers', () => {
  it('throws when handlers are undefined', () => {
    expect(
      () => validateHandlers()
    ).toThrow(/without handlers/);
  });

  it('throws when handlers are empty', () => {
    expect(
      () => validateHandlers({})
    ).toThrow(/without handlers/);
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
