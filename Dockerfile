FROM ubuntu:latest

WORKDIR /app

# install cypress dependencies
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb sudo curl
# install node
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN sudo apt-get install -y nodejs npm

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY . .

RUN npm install
RUN npm run build

# build arguments
# possible values for NODE_ENV can be ["production"]
ARG NODE_ENV

CMD [ "npm", "start" ]
