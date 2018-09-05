// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import index from './index';

describe('printNum', () => {
  let l;
  let printNum;

  beforeEach(() => {
    l = {
      debug: jest.fn((cb) => cb()),
      warn: jest.fn(() => void 0)
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
