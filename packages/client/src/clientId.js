// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
