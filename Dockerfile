FROM ubuntu:18.04

# Install any needed packages
RUN apt-get update
RUN apt-get install -y curl gcc g++ make python git

# install node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# add the polkadot-js client
RUN npm install -g yarn
RUN yarn global add @polkadot/client-cli@beta

# ports for p2p & ws-rpc
EXPOSE 31333 9966
CMD ["polkadot-js"]
