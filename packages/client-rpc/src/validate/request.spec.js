const { validateRequest } = require('./index');

describe('validateRequest', () => {
  it('fails when jsonrpc !== 2.0', () => {
    expect(
      () => validateRequest(0, '1.0')
    ).toThrow(/Invalid jsonrpc field, expected '2.0', got '1.0'/);
  });

  it('fails when id is not defined', () => {
    expect(
      () => validateRequest(undefined, '2.0')
    ).toThrow(/Expected a defined id, received 'undefined'/);
  });

  it('fails when id is non-numeric', () => {
    expect(
      () => validateRequest('someId', '2.0')
    ).toThrow(/Expected a numeric id, received 'someId'/);
  });
});
