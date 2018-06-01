#!/bin/sh
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

set -e

SRC=$1

if [ "$SRC" == "" ]; then
  echo "Usage: wat2wasm <file>"
  exit 1
fi

BIN_PATH=tmp/wabt/bin
DST=${SRC/.wat/.wasm}
BASEDIR=$(dirname "$0")

echo "*** Compiling $SRC -o $DST"
$BIN_PATH/wat2wasm $SRC -o $DST

echo "*** Completed"

exit 0
