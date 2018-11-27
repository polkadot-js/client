// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeStats } from './types';

type Instrument<T> = {
  (name: string, fn: () => T): T,

  clear (): void,
  stats (): RuntimeStats
};

let stats: RuntimeStats = {};

function instrument <T> (name: string, fn: () => T): T {
  const start = Date.now();
  const result = fn();
  const elapsed = Date.now() - start;

  stats[name] = stats[name]
    ? {
      calls: stats[name].calls + 1,
      elapsed: stats[name].elapsed + elapsed
    }
    : {
      calls: 1,
      elapsed
    };

  return result;
}

(instrument as Instrument<any>).clear = (): void => {
  stats = {
    total: {
      calls: 0,
      elapsed: 0
    }
  };
};

(instrument as Instrument<any>).stats = (): RuntimeStats => {
  Object.keys(stats).forEach((fn) => {
    if (fn === 'total') {
      return;
    }

    stats[fn].average = stats[fn].elapsed / stats[fn].calls;
    stats.total = {
      calls: stats[fn].calls + stats.total.calls,
      elapsed: stats[fn].elapsed + stats.total.elapsed
    };
  });

  return stats;
};

export default (instrument as Instrument<any>);
