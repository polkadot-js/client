// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

declare type Commands = {
  START: number,
  SIZE: number,
  FILL: number,
  NUMBER: number,
  READ: number,
  END: number,
  ERROR: number
};

declare const commands: Commands;

export = commands;
