// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { Logger } from '@polkadot/util/types';

const utf8Coder = new TextDecoder('utf-8');

module.exports = function print (l: Logger, data: Uint8Array): void {
  l.log(
    utf8Coder.decode(data)
  );
};
