FROM node:20.11.1-buster

WORKDIR /app

# install dependencies for node and cypress
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

COPY package.json /.project/package.json
COPY package-lock.json /.project/package-lock.json
RUN cd /.project && npm ci
RUN mkdir -p /opt/app && cp -a /.project/. /opt/app/

WORKDIR /opt/app

RUN npm ci

COPY . /opt/app

# build arguments
ARG NODE_ENV
ARG NODE_CONFIG_ENV

# Mount secret during documentation generation
RUN --mount=type=secret,id=openai_key \
    export OPENAI_API_KEY=$(cat /run/secrets/openai_key) && \
    npm run generate-documentation

RUN npm run build

CMD [ "npm", "start" ]
