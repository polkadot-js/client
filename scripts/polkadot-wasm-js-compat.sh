#!/bin/bash
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

set -e

BASEDIR=$(dirname "$0")
PKG=$BASEDIR/../node_modules/@polkadot/wasm-bin/wasm32-unknown-unknown
DST=$BASEDIR/../packages/client-wasm/src/wasm
SRCWASM=( "polkadot_runtime.wasm" "polkadot_runtime.compact.wasm" )
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

  echo "*** $SRC :: Creating JS Uint8Array output"

  JSSRC=${SRC/.wasm/.wasm.js}

  $BASEDIR/polkadot-wasm-wasm2js.js --input $DIR/$SRC --output $DST/$JSSRC

  echo "*** $SRC :: Done"
}

for SRC in "${SRCPROX[@]}"; do
  wat2js $DST $SRC
done

for SRC in "${SRCWASM[@]}"; do
  wasm2js $PKG $SRC
done

exit 0
