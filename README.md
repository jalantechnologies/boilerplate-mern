# Boilerplate - MERN

Boilerplate project for NodeJS, React based projects in TypeScript. This README documents whatever steps are necessary to get your application up and running.

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

- Node (v14.17) - [Download](https://nodejs.org/en/download/)
- MongoDb (v5) - [Download](https://www.mongodb.com/docs/manual/installation/)

**Scripts:**

- Install dependencies - `npm install`
- Build Project - `npm build`
- Start Application (without HotReload) - `npm start`
- Start Application (with HotReload enabled) - `npm run serve`
  - To disable opening up browser automatically, set `WEBPACK_DEV_DISABLE_OPEN` to `true`.
- Run Lint (JavaScript and TypeScript) - `npm run lint`
- Run Lint (Markdown) - `npm run lint:md`
- Run E2E tests - `npm run e2e`

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
| Grafana | Logger | https://grafana.com/blog/2022/07/07/how-to-configure-grafana-loki-with-a-node.js-e-commerce-app/ | - logger.transports = ['grafana']<br>- grafana.host - Hostname for Loki logger on Grafana<br>- grafana.username - Username for authenticating with Loki logger on Grafana- grafana.password - Password for authenticating with Loki logger on Grafana<br>- grafana.labels.app - Label 'app' to be associated with the logs<br>- grafana.labels.env - Label 'env' to be associated with the logs<br>  |
| Inspectlet | Analytics | https://docs.inspectlet.com/hc/en-us/articles/206355438-Installing-Inspectlet | - inspectlet.wid = Unique Inspectlet key provided by inspectlet |         
|        |                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                      |

## Deployment

This project deploys on Kubernetes via GitHub actions using workflows defined in [GitHub CI](https://github.com/jalantechnologies/github-ci).

**Version:**

This project uses [v1](https://github.com/jalantechnologies/github-ci/tree/v1)

**Features:**

- Deployment on Digital Ocean kubernetes cluster
- Inbuilt docker registry integration
- Production rollout on `main` branch update
- Preview environment on Pull Requests
- Configuration management via Doppler
- Automatic deployment reload on configuration update
- E2E test support

**Setup:**

- Docker registry:
    - This setup supports provisioning our own private self-hosted docker registry
    - This is where the workflow will push the built images and pulled by Kubernetes for deployment
    - Choose a URL which can be used by the registry, example: `registry.example.com`

- Replace / add the values for following in workflow files (can be found in `.github/workflows`):
    - `app_name` - Application name, only allowed `A-Za-z0-9\-`, example: `demo-app`
    - `app_hostname` - Application hostname, example: `demo.example.com`
    - `app_env` - Application environment, example: `production` / `preview`
    - `docker_registry` - Hostname which will be mapped to internal docker registry. Provide here value with chosen docker registry URL in following format - `docker_registry/app_name`.
      For example - `registry.example.com/demo-app`

- Account on Digital Ocean:
    - We will be needing API access token in order to interact with the resources on Digital Ocean
    - Learn about to create a personal access token [here](https://docs.digitalocean.com/reference/api/create-personal-access-token/). Token needs to have both `read` and `write` scope.
    - Take a note of the created **API token**. We will be needing this for rest of the setup.

- Setting up Doppler
    - For configuration management and securely providing access to the secrets to application, this setup uses [Doppler](https://www.doppler.com/) which is allows us to inject configuration parameters as environment variables to application runtime.
    - As mentioned, this is an optional requirement and is meant only for application which require runtime configuration.
    - Application environment will be obtained from value provided for `app_env`. An environment and service token is required per `app_env`.
    - Learn about creating a doppler project and environments [here](https://docs.doppler.com/docs/create-project)
    - Learn about creating a service token in order to access secret associated with an environment [here](https://docs.doppler.com/docs/service-tokens#dashboard-create-service-token)
    - Take a note of the **project**, **environment**, and **service token**. We will be needing this for rest of the setup.
    - This project has support for automatically reloading dependent applications once any configuration updates happens.
      Simply update the desired value in an environment and hit save. Application would reload automatically and will use the updated configurations.

- Setting up SonarQube
    - This workflow also supports running static analyzer on open PRs and base branch using SonarQube
    - Learn more about how to import a GitHub repository into SonarQube [here](https://github.com/jalantechnologies/platform-sonarqube#project-import-process---github)
    - Using the steps provided in [If using GitHub actions](https://github.com/jalantechnologies/platform-sonarqube#project-import-process---github), take a note of `SONAR_TOKEN` and `SONAR_HOST_URL`
    - No need to follow any remaining steps, workflows here will take care of the rest.

- Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)

- Create `terraform.tfvars` under `terraform` directory add following content:

```terraform
cluster_issuer_email = "developer@jalantechnologies.com"
do_token             = "<digital ocean token>"
do_cluster_name      = "<cluster name>"
do_alert_email       = "developer@jalantechnologies.com"
docker_registry_host = "<docker registry url>"
```

- Run:
    - `terraform -chdir=terraform init`
    - `terraform -chdir=terraform apply`
    - Wait for process to complete
    - After process has been completed, note down the output which will be presented in form of `key=value` pairs. These will
      be required in subsequent steps.

- Map DNS entries:
    - Map `A` record for value of `docker_registry_host` to value of `ingress_nginx_service_external_ip`
    - Map `A` records for `app_hostname` provided to the workflows to value of `ingress_nginx_service_external_ip`

- Add GitHub secrets to the repository:
    - `DOCKER_USERNAME` - Value of `docker_registry_auth_user`
    - `DOCKER_PASSWORD` - By obtaining value of `docker_registry_auth_password` via - `terraform -chdir=terraform output docker_registry_auth_password`
    - `DOPPLER_PREVIEW_TOKEN` - Doppler token for `preview` environment. See `Setting up Doppler`.
    - `DOPPLER_PRODUCTION_TOKEN` - Doppler token for `production` environment. See `Setting up Doppler`.
    - `DO_ACCESS_TOKEN` - Digital Ocean access token. See `Account on Digital Ocean`.
    - `DO_CLUSTER_ID` - Value of `do_cluster_id`
    - `SONAR_TOKEN` - See `Setting up SonarQube`
    - `SONAR_HOST_URL` - See `Setting up SonarQube`

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
