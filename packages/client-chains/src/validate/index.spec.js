// ISC, Copyright 2017 Jaco Greeff

const test = {
  name: 'Test Chain',
  genesis: { author: '0x0' },
  params: { networkID: 666 }
};

describe('validateChain', () => {
  let validateChain;
  let mockValidateGenesis;
  let mockValidateObject;
  let mockValidateParams;

  beforeEach(() => {
    jest.resetModules();

    mockValidateGenesis = jest.fn(() => true);
    mockValidateObject = jest.fn(() => true);
    mockValidateParams = jest.fn(() => true);

    jest.mock('./genesis', () => mockValidateGenesis);
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

  it('validates the genesis', () => {
    validateChain(test);

    expect(mockValidateGenesis).toHaveBeenCalledWith(test.genesis, false);
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

    [mockValidateGenesis, mockValidateParams].forEach((mock) => {
      expect(mock).toHaveBeenCalledWith(anyObject, true);
    });
  });
});
