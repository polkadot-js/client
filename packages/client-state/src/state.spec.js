// ISC, Copyright 2017-2018 Jaco Greeff

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
    expect(state.genesis.hash).toEqual(chain.genesis.hash);
  });

  it('starts with best being genesis', () => {
    expect(state.best.hash).toEqual(chain.genesis.hash);
  });
});
