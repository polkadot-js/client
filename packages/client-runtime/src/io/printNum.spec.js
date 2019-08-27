// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import index from '.';

describe('printNum', () => {
  let l;
  let printNum;

  beforeEach(() => {
    l = {
      debug: jest.fn((cb) => cb()),
      warn: jest.fn(() => {})
    };
    printNum = index({ l }).print_num;
  });

  it('logs the number using the supplied logger', () => {
    printNum(0, 12345);

    expect(
      l.warn
    ).toHaveBeenCalledWith('12345');
  });
});
