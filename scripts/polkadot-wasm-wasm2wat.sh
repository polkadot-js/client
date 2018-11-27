#!/bin/sh
# Copyright 2017-2018 @polkadot/client-wasm authors & contributors
# This software may be modified and distributed under the terms
# of the Apache-2.0 license. See the LICENSE file for details.

set -e

SRC=$1

if [ "$SRC" == "" ]; then
  echo "Usage: wasm2wat <file>"
  exit 1
fi

BIN_PATH=tmp/wabt/bin
DST=${SRC/.wasm/.wat}
BASEDIR=$(dirname "$0")

echo "*** Compiling $SRC -o $DST"
$BIN_PATH/wasm2wat $SRC -o $DST

echo "*** Completed"

exit 0
