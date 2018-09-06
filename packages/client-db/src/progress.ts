// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ProgressCb, ProgressValue } from '@polkadot/db/types';

const SPINNER = ['|', '/', '-', '\\'];
const PREPEND = '                                     ';

export default function createCallback (): ProgressCb {
  let lastUpdate = 0;
  let spin = 0;

  return (progress: ProgressValue): void => {
    const now = Date.now();

    if ((now - lastUpdate) > 200) {
      const percent = `      ${progress.percent.toFixed(2)}`.slice(-6);
      const keys = progress.keys > 9999
        ? `${(progress.keys / 1000).toFixed(2)}k`
        : progress.keys;

      process.stdout.write(`${PREPEND}${SPINNER[spin % SPINNER.length]} ${percent}%, ${keys} keys\r`);

      lastUpdate = now;
      spin++;
    }
  };
}
