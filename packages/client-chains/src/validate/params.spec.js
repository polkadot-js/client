// ISC, Copyright 2017-2018 Jaco Greeff

const test = {
  networkID: '0x1f'
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

  it('validates networkID as hex', () => {
    expect(
      () => validateParams(
        Object.assign({}, test, { networkID: 123 })
      )
    ).toThrow(/networkID should be a Hex/);
  });
});
