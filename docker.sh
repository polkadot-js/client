#!/bin/sh

set -e

CMD="$1"

case $CMD in
  build)
    echo "*** Building polkadot-js-client"
    docker build -t polkadot-js-client .
    exit 0
    ;;
  publish)
    VERSION="$2"

    if [ -z "$VERSION" ]; then
      echo "Error: Expected <version> after publish"
      exit 1
    fi

    echo "*** Tagging polkadot-js-client $VERSION"
    docker tag polkadot-js-client jacogr/polkadot-js-client:$VERSION

    echo "*** Publishing polkadot-js-client $VERSION"
    docker push jacogr/polkadot-js-client:$VERSION
    exit 0
    ;;
  *)
    echo "Usage: docker.sh <build|publish>"
    exit 1
    ;;
esac
