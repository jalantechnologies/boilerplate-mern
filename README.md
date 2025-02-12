# Boilerplate - MERN

Boilerplate project for NodeJS, React based projects in TypeScript. This README documents whatever steps are necessary to get your application up and running.

## Badge Reports

| Build | Tests | Code Coverage |
|--------|--------|--------|
| ![Build](https://img.shields.io/github/actions/workflow/status/jalantechnologies/boilerplate-mern/preview_on_pr_update.yml)| [![Tests](https://img.shields.io/github/actions/workflow/status/jalantechnologies/boilerplate-mern/preview_on_pr_update.yml)] | [![Code Coverage](https://img.shields.io/badge/Code%20Coverage-90%25-success?style=flat)] |


## Table of Contents

- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Integrations](#integrations)
- [Deployment](#deployment)
- [E2E Testing](#e2e-testing)

## Getting Started

**Quickstart:**

- This project supports running the application with all the required dependencies using `docker compose`
- Install [docker](https://docs.docker.com/engine/install/)
- Run `docker compose -f docker-compose.dev.yml up` (Add `--build` to force rebuild when new dependencies have been added)
- Application should open up automatically. In case it doesn't, go to - `http://localhost:3000`
- Make required changes for development. Both backend and frontend should hot reload and server restart is not required.

**Bonus:**

- On running `serve`, frontend server is at - `http://localhost:3000`
- On running `serve`, backend server is at - `http://localhost:8080`
- To connect to MongoDb server using a client, can use - `mongodb://localhost:27017`

**Pre Requirements:**

- Node (v22.13.1) - [Download](https://nodejs.org/download/release/v22.13.1/)
- MongoDb (v4.4.24) - [Download](https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-4.4.24.tgz)

**Scripts:**

- Install dependencies - `npm install`
- Build Project - `npm build`
- Start Application (without HotReload) - `npm start`
- Start Application (with HotReload enabled) - `npm run serve`
  - To disable opening up browser automatically, set `WEBPACK_DEV_DISABLE_OPEN` to `true`.
- Run Lint (JavaScript and TypeScript) - `npm run lint`
- Run Lint (Markdown) - `npm run lint:md`
- Run E2E tests - `npm run e2e`
- Open Cypress - `npm run cy:open`
- Format files using Prettier - `npm run fmt`

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

**INFO:** For injecting environment variables, can add `.env` file in the application root directory.

**UI Config:**

Config module can be also used to inject configuration values into frontend build. `public` accepts key value pairs which will all get injected
into frontend builds.

- Define the config entry in appropriate config file under `public`, example - `public.myServiceKey`. Note that deployment does not supports injecting config
values using environment variables so avoid using `custom-environment-variables.yml` here.
- Use the config value via `Config.getConfigValue('myServiceKey')`
- For scripts directly using the config from `window`, can use the config directly via `window.Config.myServiceKey`. For type safety for the same, can add the entry in
`src/apps/frontend/types/globals.d.ts`.

## Integrations

This project support following integrations
**TODO: Need to add documentation for all integrations**

| Name    | Type   | Documentation                                                                                    | Configuration                                                                                                                                                                                                                                                                                                                                                                                        |
|---------|--------|--------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DataDog | Logger | -Create a dedicated public channel named "Error Alerts" within your MS Teams workspace. This centralized space will serve as a hub for all error-related communications.<br>-Streamline the error alert process by integrating the "Error Alerts" channel with DataDog. This integration enhances communication and incident response. <br>-Guidance on Integration<br>  https://jalantechnologies.com/uncategorized/push-notifications-from-datadog-to-microsoft-teams/<br>-For implementation, refer the following links<br>-PR: https://github.com/jalantechnologies/boilerplate-mern/pull/88<br>-docs: https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30 | - logger.transports = ['datadog']<br>- datadog.api_key - <DATADOG_CLIENT_TOKEN><br>- datadog.app_name - <DATADOG_CLIENT_TOKEN_NAME> <br> in this implementation these are not the datadog's api key and name, to generate these, create a client token under Organisational settings > Client token<br> refer docs under logs > getting started > client for more info |
| Inspectlet | Analytics | https://docs.inspectlet.com/hc/en-us/articles/206355438-Installing-Inspectlet | - inspectlet.wid = Unique Inspectlet key provided by inspectlet |         
|        |                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                      |

## Deployment

This project deploys on Kubernetes via GitHub actions using workflows defined in [GitHub CI](https://github.com/jalantechnologies/github-ci).

## E2E Testing

**Pre Requirements:**

Get the application up and running via following steps in [Getting Started](#getting-started)

**Troubleshooting:**

If you're running into ```npm ERR! code ELIFECYCLE npm ERR! err no1``` error, follow these steps to fix it:

- `sudo npm cache clean -f (force) clear you npm cache`
- `sudo npm install -g n install n`
- `sudo n stable upgrade to the current stable version)`

For more detailed info, check out this official [guide](https://docs.cypress.io/guides/references/troubleshooting) on troubleshooting.

**Running specs from the command line:**

```shell
# run the entire suite
cypress run
  
# run headless chrome
cypress run --headless --browser chrome

# run an individual spec file
cypress run --spec "cypress/e2e/login.spec.cy.ts"

# run all specs within the folder matching the glob (Note: Using double quotes is strongly recommended.
cypress run --spec "cypress/e2e/**/*"
```

**Running specs from the GUI:**

1. Open the Cypress Test Runner and click on any types of testing _E2E Testing_ & _Component Testing_.

```shell
cypress run
```

<img width="1193" alt="Screenshot 2022-07-14 at 12 51 15 PM" src="https://user-images.githubusercontent.com/40771084/178925347-6c81c0e3-a06c-49c8-890b-3c03f003f1d8.png">

2. The Cypress Test Runner will open a new window with browser option, select respective browser.

<img width="1190" alt="Screenshot 2022-07-14 at 12 51 44 PM" src="https://user-images.githubusercontent.com/40771084/178925383-1833b6ce-534f-4d7f-b6c5-582eaa409686.png">

3. The Cypress Test Runner will open a new window with specs, clicking on any spec will execute the test in browser.

<img width="1712" alt="Screenshot 2022-07-14 at 12 51 58 PM" src="https://user-images.githubusercontent.com/40771084/178925733-bb55ece5-e271-4997-93e0-24e4e4dd2525.png">

<img width="1441" alt="Screenshot 2022-07-14 at 12 54 17 PM" src="https://user-images.githubusercontent.com/40771084/178925765-ec555319-955a-4382-be52-3d981f77fa09.png">
