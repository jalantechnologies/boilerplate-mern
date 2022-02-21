# Boilerplate - NodeTS

Boilerplate project for NodeJS based projects in TypeScript. This README documents whatever steps are necessary to get your application up and running.

## Table of Contents

- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [CI](#ci)

## Getting Started

**Pre Requirements:**

- Node - [Download Link](https://nodejs.org/en/download/)

_Scripts:_

- Install dependencies - `npm install`
- Build Project - `npm build`
- Start Application (without HotReload) - `npm start`
- Start Application (with HotReload enabled) - `npm run serve`
- Run Lint (JavaScript and TypeScript) - `npm run lint`
- Run Lint (Markdown) - `npm run lint:md`

_Docker Support:_

- Project has inbuilt docker support for running in a containerized environment

- For building development / test build - `docker build . --tag "boilerplate-node-ts"`
- For building production build (removes development dependencies) - `docker build . --tag "boilerplate-node-ts" --build-arg NODE_ENV=production`

## Configuration

The module uses [config](https://www.npmjs.com/package/config) for loading configuration entries.

In the `config` directory:

- Consult/update `custom-environment-variables.json` for loading values via environment. This overrides any value set in files defined below.
- Create `local.json` for local config.
- Consult/update `development.json` for values at development. (The default env)
- Consult/update `testing.json` for values at testing. `NODE_CONFIG_ENV` must be set to `testing` for this.
- Consult/update `staging.json` for values at staging. `NODE_CONFIG_ENV` must be set to `staging` for this.
- Consult/update `production.json` for values at production. `NODE_CONFIG_ENV` must be set to `production` for this.
- Consult/update `default.json` for **constant values only**. Define entries here which will remain same across deployments.

**INFO:** `default.json` config file lists the all available entries which the system uses. For creating a new config entry:

- If the config value tends to change across deployments, provide `undefined` for the same in `default.json` and value should be provided in respective deployment file.
- If the config value is supposed to be same across deployments, provide the same in `default.json`.

**INFO:** `local*` files allows you to manually provide config during development and are set to be ignored by VCS. Any environment can be overridden locally via:

- `local.json` - Overrides everything.
- `local-{env}.json` - Overrides only specific `env` environment.

**INFO:** Read more about in what order the config entries are loaded [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order).

Each entry here in this documentation follows the following structure:

`object.notation` `data-type` `ENVIRONMENT_OVERRIDE` (if available) - Description (Default - `value`)

## CI

This project uses [CircleCI](https://circleci.com/) for CI. A [docker executor](https://circleci.com/docs/2.0/executor-types/#using-multiple-docker-images) is set up using multiple docker images (node and mongo). The application is built using the node container and connects to mongo container for db connections. Other external API calls are mocked.
