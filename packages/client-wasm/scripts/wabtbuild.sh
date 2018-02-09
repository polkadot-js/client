#!/bin/sh
# Copyright 2017-2018 Jaco Greeff
# This software may be modified and distributed under the terms
# of the ISC license. See the LICENSE file for details.

set -e

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

exit 0
