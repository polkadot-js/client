# `Dockerfile` is generated from `Dockerfile.tmpl` via `docker.sh`
#
# To make build changes and have it reflect via the `Dockerfile`, you
# would make any build changes to `Dockerfile.tmpl`. `docker.sh build`
# takes this, adds the version from `package.json` and pulls a package
# from npm to do the the actual versioned build

# base image
FROM ubuntu:18.04

# Install any needed packages
RUN apt-get update
RUN apt-get install -y curl gcc g++ make python git

# install node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# env variable works around gyp install with root permissions
RUN NPM_CONFIG_USER=root npm install -g @polkadot/client-cli@VERSION

# ports for p2p & ws-rpc
EXPOSE 30333 60666 9090 9944
ENTRYPOINT ["polkadot-js"]
