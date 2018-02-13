// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-wasm-runtime/types';

// flowlint-next-line unclear-type:off
module.exports = function createFn (exports: Object, name: string, runtime: RuntimeInterface): Function {
  return (...data: Array<Uint8Array>) =>
    exports[name].apply(
      exports,
      data.reduce((params, data) => {
        params.push(
          runtime.environment.heap.set(
            runtime.environment.heap.allocate(data.length),
            data
          )
        );
        params.push(data.length);

        return params;
      }, [])
    );
};
