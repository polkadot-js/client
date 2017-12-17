// ISC, Copyright 2017 Jaco Greeff

const fs = require('fs');
const rimraf = require('rimraf');

const createDir = require('./dir');

describe('createDir', () => {
  it('expects a root path', () => {
    expect(
      () => createDir()
    ).toThrow(/Expected root path/);
  });

  it('expects a sub path', () => {
    expect(
      () => createDir('./tmp')
    ).toThrow(/Expected sub path/);
  });

  it('expects a name', () => {
    expect(
      () => createDir('./tmp', 'temp')
    ).toThrow(/Expected name/);
  });

  it('creates the path', () => {
    rimraf.sync('./tmp/test/whatever');
    createDir('./tmp', 'test', 'whatever');

    const stats = fs.lstatSync('./tmp/test/whatever');

    expect(
      stats.isDirectory()
    ).toEqual(true);
  });
});
