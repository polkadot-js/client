// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const State = require('./state');

describe('State', () => {
  let chain;
  let state;

  beforeEach(() => {
    chain = {
      genesis: {
        hash: '0x1234567890'
      }
    };
    state = new State(chain);
  });

  it('assigns the specified chain', () => {
    expect(state.chain).toEqual(chain);
  });

  it('stores genesis', () => {
    expect(state.genesis.hash).toEqual('0x1234567890');
  });

  it('starts with best being genesis', () => {
    expect(state.best.hash).toEqual('0x1234567890');
  });
});
