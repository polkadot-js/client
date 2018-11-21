// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// TODO: It may make sense to move this to @polkadot/util
export default function keyToCamel (key: string, startIndex: number = 0): string {
  return key
    .split('-')
    .reduce((name, part, index) => {
      if (index <= startIndex) {
        return part;
      }

      const upper = part.substr(0, 1).toUpperCase();
      const lower = part.substr(1).toLowerCase();

      return `${name}${upper}${lower}`;
    }, '');
}
