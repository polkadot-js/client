// ISC, Copyright 2017-2018 Jaco Greeff

const test = {
  author: '0x0000000000000000000000000000000000000000',
  hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  parentHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  stateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000'
};

describe('validateGenesis', () => {
  let validateGenesis;
  let mockValidateObject;

  beforeEach(() => {
    jest.resetModules();

    mockValidateObject = jest.fn(() => true);

    jest.mock('./object', () => mockValidateObject);

    validateGenesis = require('./genesis');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('validates the keys', () => {
    validateGenesis(test);

    expect(mockValidateObject).toHaveBeenCalledWith('Chain.genesis', test, validateGenesis.KNOWN_KEYS, false);
  });

  it('validates the keys (strict)', () => {
    validateGenesis(test, true);

    expect(mockValidateObject).toHaveBeenCalledWith('Chain.genesis', test, validateGenesis.KNOWN_KEYS, true);
  });

  it('validates the author', () => {
    expect(
      () => validateGenesis(
        Object.assign({}, test, { author: 'notHex' })
      )
    ).toThrow(/AccountId/);
  });

  it('validates the hash', () => {
    expect(
      () => validateGenesis(
        Object.assign({}, test, { hash: 'notHex' })
      )
    ).toThrow(/HeaderHash/);
  });

  it('validates the parentHash', () => {
    expect(
      () => validateGenesis(
        Object.assign({}, test, { parentHash: 'notHex' })
      )
    ).toThrow(/HeaderHash/);
  });

  it('validates the stateRoot', () => {
    expect(
      () => validateGenesis(
        Object.assign({}, test, { stateRoot: 'notHex' })
      )
    ).toThrow(/Hash/);
  });
});
