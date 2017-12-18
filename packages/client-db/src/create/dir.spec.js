// ISC, Copyright 2017 Jaco Greeff

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
