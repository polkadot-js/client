// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('printNum', () => {
  let l;
  let printNum;

  beforeEach(() => {
    l = {
      log: jest.fn(() => void 0)
    };
    printNum = index({ l }).print_num;
  });

  it('logs the number using the supplied logger', () => {
    printNum(12345);

    expect(
      l.log
    ).toHaveBeenCalledWith(12345);
  });
});
