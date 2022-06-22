FROM node:14

WORKDIR /app

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .

RUN npm install
RUN npm run build

# build arguments
# possible values for NODE_ENV can be ["production"]
ARG NODE_ENV

CMD [ "npm", "start" ]
