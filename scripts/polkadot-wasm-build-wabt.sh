#!/bin/sh
# Copyright 2017-2018 @polkadot/client-wasm authors & contributors
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

set -e

BIN_PATH=tmp/wabt/out/gcc/Release

if [ -d $BIN_PATH ]; then
  echo "*** Wabt path found, skipping compilation"
else
  echo "*** Setting up tmp/"
  mkdir -p tmp

  cd tmp

  if [ ! -d "wabt" ]; then
    echo "*** Cloning wabt"
    git clone --recursive https://github.com/WebAssembly/wabt.git
  fi

  echo "*** Building wabt"
  cd wabt
  make gcc-release

  echo "*** Completed build"
  cd ../..
fi

exit 0
