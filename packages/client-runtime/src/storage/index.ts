// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterface$Storage } from '../types';

import child from './child';
import data from './data';
import trie from './trie';

export default function storage (env: RuntimeEnv): RuntimeInterface$Storage {
  return {
    ...child(env),
    ...data(env),
    ...trie(env)
  };
}
