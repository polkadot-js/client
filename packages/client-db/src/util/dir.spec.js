// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const fs = require('fs');
const rimraf = require('rimraf');

const createDir = require('./dir');

describe('createDir', () => {
  it('creates the path', () => {
    rimraf.sync('./tmp/test/whatever');
    createDir('./tmp', 'test', 'whatever');

    const stats = fs.lstatSync('./tmp/test/whatever');

    expect(
      stats.isDirectory()
    ).toEqual(true);
  });
});
