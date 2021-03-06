## Description

Payments Microservice
CQRS + [Event Sourcing](https://github.com/ArkerLabs/event-sourcing-nestjs) using redis as a message broker and mongodb as a database.
All developed on top of NestJS using typescript.

## Installation

```bash
$ npm install
```

## Configuration

```bash
$ cp .env.example .env
```

Edit the file with your config data.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
