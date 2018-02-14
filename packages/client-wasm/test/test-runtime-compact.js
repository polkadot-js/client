const { loadWasmExt } = require('./helpers');

const externals = [
  'ext_blake2_256', 'ext_ed25519_verify', 'ext_enumerated_trie_root', 'ext_free', 'ext_get_allocated_storage', 'ext_get_storage_into', 'ext_malloc', 'ext_memcmp', 'ext_memcpy', 'ext_memmove', 'ext_memset', 'ext_print_hex', 'ext_print_num', 'ext_print_utf8', 'ext_set_storage', 'ext_storage_root', 'ext_twox_128'
].reduce((result, name) => {
  result[name] = (...params) => {
    console.log('\tcalled:', name, params);
    return 654321;
  };

  return result;
}, {});

const memory = new WebAssembly.Memory({ initial: 10, maximum: 10 });
const table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' });

const instance = new WebAssembly.Instance(
  new WebAssembly.Module(loadWasmExt('polkadot_runtime.compact.wasm')),
  {
    env: Object.assign({
      memory,
      memoryBase: 0,
      table,
      tableBase: 0
    }, externals)
  }
);

const fns = Object.keys(instance.exports).filter((name) => typeof instance.exports[name] === 'function');
const param = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const heap = new Uint8Array(memory.buffer);
const offset = 32768;

heap.set(param, offset);

console.log('exports', fns.join(', '));

fns.map((name) => [name, instance.exports[name]]).forEach(([name, func]) => {
  try {
    console.log('***', name);
    console.log('\tparams:', offset, param.length);
    console.log('\treturned:', func(offset, param.length));
  } catch (error) {
    console.error('\terror:', error.message);
  }
});
