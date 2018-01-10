// ISC, Copyright 2017-2018 Jaco Greeff

const utf8Decode = require('./utf8Decode');

describe('utf8Decode', () => {
  const TEST = 'Привет, мир!';

  it('decodes the buffer correctly', () => {
    expect(
      utf8Decode(
        new TextEncoder('utf-8').encode(TEST)
      )
    ).toEqual(TEST);
  });
});
