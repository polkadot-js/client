// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export default function unimplemented (name: string): any {
  throw new Error(`${name} not implemented, only stubbed`);
}
