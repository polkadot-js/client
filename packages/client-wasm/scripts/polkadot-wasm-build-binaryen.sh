#!/bin/sh
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

set -e

BIN_PATH=tmp/binaryen/bin/wasm-opt

if [ -d $BIN_PATH ]; then
  echo "*** binaryen path found, skipping compilation"
else
  echo "*** Setting up tmp/"
  mkdir -p tmp

  cd tmp

  if [ ! -d "binaryen" ]; then
    echo "*** Cloning binaryen"
    git clone --recursive https://github.com/WebAssembly/binaryen.git
    rm -rf binaryen/test
  fi

  echo "*** Building wasm-opt"
  cd binaryen
  cmake . && make wasm-opt

  echo "*** Completed build"
  cd ../..
fi

exit 0
