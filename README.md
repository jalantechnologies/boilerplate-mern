# Boilerplate - NodeTS

Boilerplate project for NodeJS, React based projects in TypeScript. This README documents whatever steps are necessary to get your application up and running.

## Table of Contents

- [Getting Started](#getting-started)
- [Configuration](#configuration)

## Getting Started

**Quickstart:**

- This project supports running the application with all the required dependencies using `docker compose`
- Install [docker](https://docs.docker.com/engine/install/)
- Run `docker compose -f docker-compose.dev.yml up`
- Open `http://localhost:8080/`
- Make required changes for development. The app should hot reload and server restart is not required.

**Pre Requirements:**

- Node - [Download](https://nodejs.org/en/download/)
- MongoDb - [Download](https://www.mongodb.com/docs/manual/installation/)

**Scripts:**

- Install dependencies - `npm install`
- Build Project - `npm build`
- Start Application (without HotReload) - `npm start`
- Start Application (with HotReload enabled) - `npm run serve`
- Run Lint (JavaScript and TypeScript) - `npm run lint`
- Run Lint (Markdown) - `npm run lint:md`

## Configuration

The module uses [config](https://www.npmjs.com/package/config) for loading configuration entries.

In the `config` directory:

- Consult/update `custom-environment-variables.yml` for loading values via environment. This overrides any value set in files defined below.
- Create `local.yml` for local config.
- Consult/update `development.yml` for values at development. (The default env)
- Consult/update `testing.yml` for values at testing. `NODE_CONFIG_ENV` must be set to `testing` for this.
- Consult/update `staging.yml` for values at staging. `NODE_CONFIG_ENV` must be set to `staging` for this.
- Consult/update `production.yml` for values at production. `NODE_CONFIG_ENV` must be set to `production` for this.
- Consult/update `default.yml` for **constant values only**. Define entries here which will remain same across deployments.

**INFO:** `default.yml` config file lists the all available entries which the system uses. For creating a new config entry:

- If the config value tends to change across deployments, provide `undefined` for the same in `default.yml` and value should be provided in respective deployment file.
- If the config value is supposed to be same across deployments, provide the same in `default.yml`.

**INFO:** `local*` files allows you to manually provide config during development and are set to be ignored by VCS. Any environment can be overridden locally via:

- `local.yml` - Overrides everything.
- `local-{env}.yml` - Overrides only specific `env` environment.

**INFO:** Read more about in what order the config entries are loaded [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order).

Each entry here in this documentation follows the following structure:

`object.notation` `data-type` `ENVIRONMENT_OVERRIDE` (if available) - Description (Default - `value`)
