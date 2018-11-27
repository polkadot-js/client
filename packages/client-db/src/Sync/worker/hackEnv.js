// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// HACK Under Node workers not all process functions are exposed. Since some are actually
// needed for proper operation on some modules, we work around this and add the missing
// operations so we can actually continue

const { isFunction } = require('@polkadot/util');

// process.umask is used by mkdirp to set the correct permissions
if (!isFunction(process.umask)) {
  // Provide a sane default for the umask (octal)
  process.umask = () => 022;
}
