// ISC, Copyright 2017 Jaco Greeff
// @flow

module.exports = function createJson<T> (id: number, body: $Shape<T>): T {
  return Object.assign({
    id,
    jsonrpc: '2.0'
  }, body);
};
