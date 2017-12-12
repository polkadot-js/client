// ISC, Copyright 2017 Jaco Greeff

const chains = require('./index');

describe('chains', () => {
  it('exports chains', () => {
    expect(Object.keys(chains).length > 0).toEqual(true);
  });
});
