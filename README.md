  <h1 align="center">Employee CRUD Endpoint
  </h1>
  

## Used Technologies and Patterns

- NestJS - Main structure of the application.
- SQLite - Database for log aggregation and test.
- TypeOrm + Repository pattern- The Orm to work with DB.
- Swagger - To generate open API document.

Some functionalities are not implemented completely.
## Main Sections :

- API endpoints for employee CRUD

#### API Endpoints

Includes CRUD APIs for employee.

## Database

Sqlite is used as Database. There are two database files in data folder for development and testing. We can manage to use correct DB automatically based on environment and NestJS config file but in this sample code a manual config file is used.

## Installation

```bash
$ npm install
```

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

Seperate DB is used for testing purpose and it is managed properly.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<img src="/assets/test.png" width="500">

## API Document

Swagger is used to generate API document automatically. Follow below steps to see the document.

1. Run the application

```bash
$ npm run start
```

2. Open following address `http://localhost:3000/swagger/` in browser

<img src="/assets/swagger.png" width="500">


