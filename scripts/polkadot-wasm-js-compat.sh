#!/bin/bash
# Copyright 2017-2018 @polkadot/client-wasm authors & contributors
# This software may be modified and distributed under the terms
# of the Apache-2.0 license. See the LICENSE file for details.

set -e

BASEDIR=$(dirname "$0")
DST=$BASEDIR/../packages/client-wasm/src/wasm
# PKG=$BASEDIR/../node_modules/@polkadot/wasm-bin/wasm32-unknown-unknown
# SRCWASM=( "polkadot_runtime.wasm" "polkadot_runtime.compact.wasm" )
SRCPROX=( "proxy_runtime.wat" "proxy_substrate.wat" )

function wat2js () {
  DIR=$1
  SRC=$2

  echo "*** $SRC :: Compiling Wat to Wasm output"

  WASMSRC=${SRC/.wat/.wasm}

  $BASEDIR/polkadot-wasm-wat2wasm.sh $DST/$SRC

  echo "*** $SRC :: Done"

  wasm2js $DST $WASMSRC
}

function wasm2js () {
  DIR=$1
  SRC=$2

  USSRC=${SRC/.compact/_compact}
  JSSRC=${USSRC/.wasm/_wasm.ts}

  echo "*** $SRC :: Creating JS Uint8Array output $JSSRC"

  $BASEDIR/polkadot-wasm-wasm2js.js --input $DIR/$SRC --output $DST/$JSSRC

  echo "*** $SRC :: Done"
}

for SRC in "${SRCPROX[@]}"; do
  wat2js $DST $SRC
done

# for SRC in "${SRCWASM[@]}"; do
#   wasm2js $PKG $SRC
# done

exit 0
