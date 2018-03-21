// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const test = {
  name: 'Test Chain',
  networkId: 666
};

describe('validateChain', () => {
  let validateChain;
  let mockValidateObject;
  let mockValidateParams;

  beforeEach(() => {
    jest.resetModules();

    mockValidateObject = jest.fn(() => true);
    mockValidateParams = jest.fn(() => true);

    jest.mock('./object', () => mockValidateObject);
    jest.mock('./params', () => mockValidateParams);

    validateChain = require('./index');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('validates the sections', () => {
    validateChain(test);

    expect(mockValidateObject).toHaveBeenCalledWith('Chain', test, validateChain.KNOWN_KEYS, false);
  });

  it('validates the params', () => {
    validateChain(test);

    expect(mockValidateParams).toHaveBeenCalledWith(test.params, false);
  });

  it('validates using strict', () => {
    const anyArray = expect.arrayContaining([]);
    const anyObject = expect.objectContaining({});

    validateChain(test, true);

    expect(mockValidateObject).toHaveBeenCalledWith('Chain', anyObject, anyArray, true);

    [mockValidateParams].forEach((mock) => {
      expect(mock).toHaveBeenCalledWith(anyObject, true);
    });
  });
});
