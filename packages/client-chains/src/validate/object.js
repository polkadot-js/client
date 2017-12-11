// ISC, Copyright 2017 Jaco Greeff
// @flow

const ExtError = require('@polkadot/util/ext/error');
const isObject = require('@polkadot/util/is/object');
const assert = require('@polkadot/util/assert');

module.exports = function validateObject (type: string, object: { [string]: any }, knownKeys: Array<string>, strict: boolean = false): boolean {
  assert(isObject(object), `${type} definition should be an object`);

  const keys = Object.keys(object);

  assert(keys.length !== 0, `${type} definition should contain keys`);

  const unknownKeys = keys
    .filter((key) => !knownKeys.includes(key))
    .map((key) => `'${key}'`);

  if (unknownKeys.length) {
    const error = `${type} definition has unknown key${unknownKeys.length === 1 ? '' : 's'}: ${unknownKeys.join(', ')}`;

    if (strict) {
      throw new ExtError(error);
    } else {
      console.warn(error);
    }
  }

  return true;
};
