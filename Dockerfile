FROM ubuntu:18.04

# Install any needed packages
RUN apt-get update
RUN apt-get install -y curl gcc g++ make python git

# install node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# env variable gets around gyp install with root permissions
RUN NPM_CONFIG_USER=root npm install -g @polkadot/client-cli@0.22.0-beta.0

# ports for p2p & ws-rpc
EXPOSE 60666 9966
ENTRYPOINT ["polkadot-js"]
