FROM node:14.17.3

# load args
# possible values for NODE_ENV can be ["testing"]
ARG NODE_ENV

# upto date apt list
RUN apt-get update \
# install packages
  && apt-get install -y --no-install-recommends \
# clean it
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# from here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

# runs production specific tasks (when value for NODE_ENV is set to production)
# prunes devDependencies via --production flag
RUN if [ "$NODE_ENV" = "production" ]; then npm prune --production; fi;
