// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const validateObject = require('./object');

describe('validateObject', () => {
  let origConsole;
  let spyConsole;

  beforeEach(() => {
    spyConsole = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn()
    };

    origConsole = global.console;
    global.console = spyConsole;
  });

  afterEach(() => {
    global.console = origConsole;
  });

  it('throws when no chain object supplied', () => {
    expect(
      () => validateObject()
    ).toThrow(/should be an object/);
  });

  it('throws when the chain object is empty', () => {
    expect(
      () => validateObject('test', {})
    ).toThrow(/should contain keys/);
  });

  it('warns with unknown keys', () => {
    validateObject('test', { unknown: '123', test: 456 }, []);

    expect(spyConsole.warn).toHaveBeenCalledWith("test definition has unknown keys: 'unknown', 'test'");
  });

  it('throws with unknown keys (strict)', () => {
    expect(
      () => validateObject('test', { unknown: 123 }, [], true)
    ).toThrow(/test definition has unknown key: 'unknown'/);
  });
});
