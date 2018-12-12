#!/bin/bash
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

DIRBIN="scripts"
DIRCT="packages/client-wasm/test/wasm"
DIRRT="packages/client-wasm/src/wasm"
DIRWB="node_modules/@polkadot/wasm-bin/wasm32-unknown-unknown"

WSRC=( "$DIRRT/proxy_substrate.wat" "$DIRRT/proxy_runtime.wat" "$DIRCT/addTwo.wat" "$DIRCT/import.wat" "$DIRCT/start.wat" )

$DIRBIN/polkadot-wasm-build-wabt.sh

for S in "${WSRC[@]}"; do
  W=${S/.wat/.wasm}
  J=${W/.wasm/_wasm.ts}
  $DIRBIN/polkadot-wasm-wat2wasm.sh $S
  $DIRBIN/polkadot-wasm-wasm2js.js --input $W --output $J
done
