# @polkadot/client-runtime

For WASM binaries to operate in the general environment, a limited libc-like environment needs to be made available. The sections here introduce _just enough_ for this to be feasible, while aligning with the Parity Polkadot implementation.

## Other runtimes

A comprehensive libc runtime has been implemented as part of the [musl](https://github.com/jfbastien/musl) project. Ideas for the memory allocation has been expanded from this project, specifically by understanding [arch/wasm32/wasm.js](https://github.com/jfbastien/musl/blob/190dffd1415cc8be52d4659aced51625d63bdbc1/arch/wasm32/wasm.js).
