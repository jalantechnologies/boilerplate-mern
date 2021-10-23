# Boilerplate - NodeTS

Boilerplate project for NodeJS based projects in TypeScript. This README documents whatever steps are necessary to get your application up and running.

## Table of Contents

- [Getting Started](#getting-started)

## Getting Started

**Pre Requirements:**

- Node - [Download Link](https://nodejs.org/en/download/)

*Scripts:*

- Install dependencies - `npm install`
- Build Project - `npm build`
- Start Application (without HotReload) - `npm start`
- Start Application (with HotReload enabled) - `npm run serve`
- Run Lint (JavaScript and TypeScript) - `npm run lint`
- Run Lint (Markdown) - `npm run lint:md`

*Docker Support:*

- Project has inbuilt docker support for running in a containerized environment

- For building development / test build - `docker build . --tag "boilerplate-node-ts"`
- For building production build (removes development dependencies) - `docker build . --tag "boilerplate-node-ts" --build-arg NODE_ENV=production`
