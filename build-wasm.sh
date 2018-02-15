#!/bin/sh
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

DIRBIN="packages/client-wasm/scripts"
DIRCT="packages/client-wasm/test/wasm"
DIRRT="packages/client-wasm-runtime/wasm"

SRC=( "$DIRRT/proxy-exports.wat" "$DIRRT/proxy-imports.wat" "$DIRCT/addTwo.wat" "$DIRCT/import.wat" "$DIRCT/start.wat" )

$DIRBIN/polkadot-wasm-build-wabt.sh

for S in "${SRC[@]}"; do
  $DIRBIN/polkadot-wasm-wat2wasm.sh $S
done
