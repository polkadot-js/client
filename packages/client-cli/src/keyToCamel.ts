// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// TODO: It may make sense to move this to @polkadot/util
// (it has `stringCamelCase` available, however start...)
export default function keyToCamel (key: string, startIndex = 0): string {
  return key
    .split('-')
    .reduce((name, part, index): string => {
      if (index <= startIndex) {
        return part;
      }

      const upper = part.substr(0, 1).toUpperCase();
      const lower = part.substr(1).toLowerCase();

      return `${name}${upper}${lower}`;
    }, '');
}
