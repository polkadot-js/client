#!/bin/sh
# ISC, Copyright 2017-2018 Jaco Greeff

set -e

SRC=$1

if [ "$SRC" == "" ]; then
  echo "Usage: wat2wasm <file>"
  exit 1
fi

BIN_PATH=tmp/wabt/out/gcc/Release

if [ -d $BIN_PATH ]; then
  echo "*** Wabt path found, skipping compilation"
else
  echo "*** Setting up tmp/"
  rm -rf tmp
  mkdir -p tmp

  echo "*** Cloning wabt"
  cd tmp
  git clone --recursive https://github.com/WebAssembly/wabt.git

  echo "*** Building wabt"
  cd wabt
  make gcc-release

  echo "*** Completed build"
  cd ../..
fi

DST=${SRC/wat/wasm}

echo "*** Compiling $SRC -o $DST"
$BIN_PATH/wat2wasm $SRC -o $DST

echo "*** Completed"

exit 0
