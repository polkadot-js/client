// ISC, Copyright 2017 Jaco Greeff
// @flow

const NAME: string = 'node.js';

let pkgJson: any;
let stability: string = 'stable';

try {
  // $FlowFixMe
  pkgJson = require('./package.json'); // compiled version
} catch (error) {
  stability = 'development';

  try {
    // $FlowFixMe
    pkgJson = require('../package.json'); // source version;
  } catch (error) {
    pkgJson = {
      version: 'unknown'
    };
  }
}

module.exports = `${NAME}/${pkgJson.version}-${stability}`;
