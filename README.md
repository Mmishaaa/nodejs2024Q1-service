# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/)
- pgAdmin - [Download & Install pgAdmin](https://www.pgadmin.org/)

## Downloading

```
git clone https://github.com/Mmishaaa/nodejs2024Q1-service.git
```

## Go to project directory

```
cd nodejs2024Q1-service
```

## Go to development branch

```
git checkout development
```

## Create .env file

```
create new file .env and copy content from .env.example file
```

## Fill in your databse information in .env

```
For running application locally - change variables that start with DATABASE prefix and change in ./prisma/schema.prisma POSTGRES_URL to DATABASE_URL
For running application in docker - change variables that start with POSTGRES prefix
```

## Docker desktop

```
Open docker desktop
```

## Starting application in docker

```
docker-compose up
or
docker-compose up -d to start container in detached mode
```

## Link to application image

```
https://hub.docker.com/repository/docker/mmishaaa/library-service-api/general
```

## Scanning docker images for vulnerabilities

```
First of all you need to login on docker
npm run docker:scout
```

## Installing NPM modules

```
npm install
```

# Start postgres server with pgadmin

# Migrate database

```
npx prisma migrate dev
```

## Running application

```
be sure to start postgres server
npm start
```

## Running application in dev mode

```
be sure to start postgres server
npm start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
