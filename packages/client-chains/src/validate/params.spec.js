// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const test = {
  networkId: 123
};

describe('validateParams', () => {
  let validateParams;
  let mockValidateObject;

  beforeEach(() => {
    jest.resetModules();

    mockValidateObject = jest.fn(() => true);

    jest.mock('./object', () => mockValidateObject);

    validateParams = require('./params');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('validates the keys', () => {
    validateParams(test);

    expect(mockValidateObject).toHaveBeenCalledWith('Chain.params', test, validateParams.KNOWN_KEYS, false);
  });

  it('validates the keys (strict)', () => {
    validateParams(test, true);

    expect(mockValidateObject).toHaveBeenCalledWith('Chain.params', test, validateParams.KNOWN_KEYS, true);
  });

  it('validates networkId as integer number', () => {
    expect(
      () => validateParams(
        Object.assign({}, test, { networkId: 123.123 })
      )
    ).toThrow(/networkId should be an integer/);
  });
});
