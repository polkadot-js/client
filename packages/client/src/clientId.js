// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const NAME = '@polkadot';

let pkgJson: { version: string };
let stability = 'stable';

try {
  // $FlowFixMe production version
  pkgJson = require('./package.json');
} catch (error) {
  stability = 'development';
  // flowlint-next-line untyped-import:off
  pkgJson = require('../package.json');
}

module.exports = `${NAME}/${pkgJson.version}-${stability}`;
