#!/bin/bash
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

DIRBIN="packages/client-wasm/scripts"
DIRCT="packages/client-wasm/test/wasm"
DIRRT="packages/client-wasm-runtime/src/wasm"
DIRWB="node_modules/@polkadot/wasm-bin/wasm32-unknown-unknown"

WSRC=( "$DIRRT/proxy_polkadot.wat" "$DIRRT/proxy_runtime.wat" "$DIRCT/addTwo.wat" "$DIRCT/import.wat" "$DIRCT/start.wat" )
JSRC=( "$DIRWB/polkadot_runtime.wasm" "$DIRRT/genesis_polkadot.wasm" )

$DIRBIN/polkadot-wasm-build-wabt.sh

for S in "${WSRC[@]}"; do
  W=${S/.wat/.wasm}
  J=${W/.wasm/_wasm.js}
  $DIRBIN/polkadot-wasm-wat2wasm.sh $S
  $DIRBIN/polkadot-wasm-wasm2js.js --input $W --output $J
done

for W in "${JSRC[@]}"; do
  if [ -f $W ]; then
    J=${W/.wasm/_wasm.js}
    P=${J/#$DIRWB/$DIRCT}
    $DIRBIN/polkadot-wasm-wasm2js.js --input $W --output $P
  else
    echo "Skipping $W"
  fi
done
