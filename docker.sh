#!/bin/sh

set -e

CMD="$1"
VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | sed 's/ //g')

function build () {
  echo "*** Creating Dokcerfile from latest version (via template)"
  sed "s/VERSION/$VERSION/g" Dockerfile.tmpl > Dockerfile

  echo "*** Building polkadot-js-client"
  docker build -t polkadot-js-client .

  exit 0
}

function publish () {
  echo "*** Tagging polkadot-js-client $VERSION"
  docker tag polkadot-js-client jacogr/polkadot-js-client:$VERSION

  echo "*** Publishing polkadot-js-client $VERSION"
  docker push jacogr/polkadot-js-client:$VERSION

  exit 0
}

function usage () {
  echo "Usage: docker.sh <build|publish>"

  exit 1
}

case $CMD in
  build)
    build
    ;;
  publish)
    publish
    ;;
  *)
    usage
    ;;
esac
