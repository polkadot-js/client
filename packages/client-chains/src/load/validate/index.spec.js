// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const test = {
  name: 'Test Chain',
  networkId: 666,
  genesis: {
    params: {
      something: 123
    }
  }
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

    expect(mockValidateObject).toHaveBeenCalledWith('Chain', test, validateChain.CHAIN_KNOWN_KEYS, false);
    expect(mockValidateObject).toHaveBeenCalledWith('Genesis', test.genesis, validateChain.GENESIS_KNOWN_KEYS, false);
  });

  it('validates the genesis params', () => {
    validateChain(test);

    expect(mockValidateParams).toHaveBeenCalledWith(test.genesis.params);
  });

  it('validates using strict', () => {
    const anyArray = expect.arrayContaining([]);
    const anyObject = expect.objectContaining({});

    validateChain(test, true);

    expect(mockValidateObject).toHaveBeenCalledWith('Chain', anyObject, anyArray, true);
    expect(mockValidateObject).toHaveBeenCalledWith('Genesis', anyObject, anyArray, true);

    [mockValidateParams].forEach((mock) => {
      expect(mock).toHaveBeenCalledWith(anyObject);
    });
  });
});
