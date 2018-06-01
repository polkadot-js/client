#!/bin/bash
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

set -e

BASEDIR=$(dirname "$0")
NODEDIR=$BASEDIR/../node_modules/@polkadot/wasm-bin/wasm32-unknown-unknown
JSDIR=$BASEDIR/../packages/client-chains/src/wasm
DST=tmp/wasm-bin-tmp
SOURCES=( "polkadot_runtime.wasm" )

rm -rf $DST
mkdir -p $DST

for SRC in "${SOURCES[@]}"; do
  echo "*** Converting $SRC to JS-compatible output"

  WASMFILE=$DST/$SRC
  WATFILE=${WASMFILE/.wasm/.wat}

  # copy, proxy handles legal
  cp -f $NODEDIR/$SRC $WASMFILE

  # create legal interface : --legalize-js-interface -g
  tmp/binaryen/bin/wasm-opt  --emit-text $NODEDIR/$SRC -o $WATFILE
  # tmp/wabt/bin/wat2wasm $WATFILE -o $WASMFILE

  echo "*** Creating JS Uint8Array output"

  JSSRC=${SRC/.wasm/_wasm.js}
  JSFILE=$JSDIR/$JSSRC

  $BASEDIR/polkadot-wasm-wasm2js.js --input $WASMFILE --output $JSFILE
done

exit 0
