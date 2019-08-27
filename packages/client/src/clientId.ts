// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import npmQuery from 'package-json';
import semcmp from 'semver-compare';
import { isFunction } from '@polkadot/util';

interface PackageJson {
  name: string;
  version: string;
}

const DEVELOPMENT = 'development';
const RELEASE = 'alpha'; // 'release'

let pkgJson: PackageJson;
let _stability = RELEASE;

try {
  _stability = RELEASE;
  pkgJson = require('./package.json');
} catch (error) {
  _stability = DEVELOPMENT;
  pkgJson = require('../package.json');
}

export const name = 'polkadot-js';
export const stability = _stability;
export const version = pkgJson.version;
export const isDevelopment = stability === DEVELOPMENT;
export const clientId = `${name}/${version}`;

export async function getNpmVersion (): Promise<string> {
  return isFunction(npmQuery)
    ? npmQuery(pkgJson.name)
      .then((npmJson): string => (npmJson as unknown as PackageJson).version)
      .catch((): string => 'unknown')
    : 'unknown';
}

export async function getNpmStatus (): Promise<string | null> {
  const verNpm = await getNpmVersion();

  if (verNpm === 'unknown') {
    return null;
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
