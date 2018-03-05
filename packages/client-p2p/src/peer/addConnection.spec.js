// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const addConnection = require('./addConnection');

describe('addConnection', () => {
  let self;

  beforeEach(() => {
    self = {
      connections: []
    };
  });

  it('adds the connection', () => {
    addConnection(self, 'connection');

    expect(self.connections).toEqual([ 'connection' ]);
  });
});
