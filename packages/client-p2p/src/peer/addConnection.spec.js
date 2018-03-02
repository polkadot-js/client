// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

describe('addConnection', () => {
  let addConnection;
  let mockReceive;
  let self;

  beforeEach(() => {
    self = {
      connections: []
    };

    mockReceive = jest.mock('./receive');
    addConnection = require('./addConnection');
  });

  it('adds the connection', () => {
    addConnection(self, 'connection');

    expect(self.connections).toEqual([ 'connection' ]);
  });

  it('receives using the new connection', () => {
    const conn = { some: { connection: '123' } };

    addConnection(self, conn);

    expect(mockReceive).toHaveBeenCalledWith(self, conn);
  });
});
