// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const deasync = require('deasync');

const isError = require('@polkadot/util/is/error');
const isUndefined = require('@polkadot/util/is/undefined');

// FIXME: This is currently for Node environments only - for Browser environments deasync is not available, we need a different solution. Once available, could move to @polkadot/util
// flowlint-next-line unclear-type:off
module.exports = function syncify (promise: Promise<any>): any {
  let result;

  promise
    .catch((error) => error)
    .then((_result) => {
      result = _result;
    });

  let ms = 0;

  while (isUndefined(result)) {
    deasync.sleep(ms++);
  }

  if (isError(result)) {
    throw result;
  }

  return result;
};
