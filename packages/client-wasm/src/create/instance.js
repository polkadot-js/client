// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

module.exports = function createInstance (module: WebAssemblyModule, imports: WebAssemblyImports): WebAssemblyInstance {
  return new WebAssembly.Instance(module, imports);
};
