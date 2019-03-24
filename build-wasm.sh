#!/bin/bash
# Copyright 2017-2019 @polkadot/client authors & contributors
# This software may be modified and distributed under the terms
# of the Apache-2.0 license. See the LICENSE file for details.

DIRBIN="scripts"
DIRRT="packages/client-wasm/src/wasm"

WSRC=( "$DIRRT/proxy_runtime.wat" "$DIRRT/proxy_substrate.wat" )

$DIRBIN/polkadot-wasm-build-wabt.sh

for S in "${WSRC[@]}"; do
  W=${S/.wat/.wasm}
  J=${W/.wasm/_wasm.ts}
  $DIRBIN/polkadot-wasm-wat2wasm.sh $S
  $DIRBIN/polkadot-wasm-wasm2js.js --input $W --output $J
done
