FROM node:14-buster

WORKDIR /app

# install dependencies for node and cypress
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app

RUN npm install

COPY . /opt/app

# build arguments
ARG NODE_ENV
ARG NODE_CONFIG_ENV

RUN npm run build

CMD [ "npm", "start" ]
