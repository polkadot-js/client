// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import npmQuery from 'package-json';
import semcmp from 'semver-compare';

type PackageJson = {
  name: string,
  version: string
};

const DEVELOPMENT = 'development';
let pkgJson: PackageJson;
let _stability = 'release';

try {
  pkgJson = require('./package.json');
} catch (error) {
  _stability = DEVELOPMENT;
  pkgJson = require('../package.json');
}

export const name = 'polkadot-js';
export const stability = _stability;
export const version = pkgJson.version;
export const isDevelopment = stability === DEVELOPMENT;
export const clientId = `${name}/${version}-${stability}`;

export async function getNpmVersion (): Promise<string> {
  return npmQuery(pkgJson.name)
    .then((npmJson: PackageJson) => npmJson.version)
    .catch(() => 'unknown');
}

export async function getNpmStatus (): Promise<string> {
  const verNpm = await getNpmVersion();

  if (verNpm === 'unknown') {
    return 'cannot retrieve from npmjs.org';
  }

  switch (semcmp(pkgJson.version, verNpm)) {
    case 0:
      return 'up to date';

    case 1:
      return `newer, ${verNpm} published`;

    default:
      return `outdated, ${verNpm} available`;
  }
}
