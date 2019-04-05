#!/bin/bash
# Copyright 2017-2019 @polkadot/client authors & contributors
# This software may be modified and distributed under the terms
# of the Apache-2.0 license. See the LICENSE file for details.

# fail fast on any non-zero exits
set -e

# the option as passed on the commandline
CMD="$1"

# the docker image name and dockerhub repo
NAME="polkadot-js-client"
REPO="jacogr"

# extract the current npm version from package.json
VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | sed 's/ //g')

# helper function to update the version
function do_version () {
  echo "*** Creating Dockerfile from latest npm version"
  sed "s/VERSION/$VERSION/g" Dockerfile.tmpl > Dockerfile
}

# helper function for the build logic
function do_build () {
  echo "*** Building $NAME"
  docker build -t $NAME .
}

# helper function for the publishing logic
function do_publish () {
  TAGVER="latest" # $VERSION

  echo "*** Tagging $NAME $TAGVER"
  docker tag $NAME $REPO/$NAME:$TAGVER

  echo "*** Publishing $NAME $TAGVER"
  docker push $REPO/$NAME:$TAGVER
}

# helper function for the usage logic
function do_usage () {
  echo "This builds a docker image for the latest npm published version."
  echo "For maintainers publishing functionality is also provided."
  echo ""
  echo "Usage: docker.sh <build|publish>"
  echo "Commands:"
  echo "  build: builds a `$NAME` docker image"
  echo "  publish: publishes a built image to dockerhub"
  echo "  version: Updates the Dockerfile version (typically on CI)"
  echo ""
}

# execute the command specified
case $CMD in
  build)
    do_version
    do_build
    exit 0
    ;;
  publish)
    do_publish
    exit 0
    ;;
  version)
    do_version
    exit 0
    ;;
  *)
    do_usage
    exit 1
    ;;
esac
