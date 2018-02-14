#!/bin/sh
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

set -e

BASEDIR=$(dirname "$0")
NODEDIR=$BASEDIR/../../../node_modules/@polkadot/wasm-bin/wasm32-unknown-unknown
DST=$BASEDIR/../test/wasm-bin
SOURCES=( "polkadot_runtime.wasm" "polkadot_runtime.compact.wasm" )

$BASEDIR/polkadot-wasm-build-binaryen.sh
$BASEDIR/polkadot-wasm-build-wabt.sh

rm -rf $DST
mkdir -p $DST/input

for SRC in "${SOURCES[@]}"; do
  INFILE=$DST/input/$SRC

  echo "*** Converting $SRC"

  cp $NODEDIR/$SRC $INFILE
  tmp/binaryen/bin/wasm-opt --legalize-js-interface -g --emit-text $INFILE -o $INFILE.wat

  cat $INFILE.wat | sed 's/(global $tempRet0 (mut i32) (i32.const 0))/& (func (export "getTempRet0") (result i32) (get_global $tempRet0))/' > $INFILE.legal.wat

  tmp/wabt/bin/wat2wasm $INFILE.legal.wat -o $DST/$SRC
done

exit 0
