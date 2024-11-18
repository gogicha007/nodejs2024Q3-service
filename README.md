# Home Library Service 2

images uploaded to my docker hub :

![alt text](image.png)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## change repository branch

```
git checkout dev_hl_3
```

## .env

rename .env.example to .env

## Running application

```
docker compose build

docker compose up
```

This will run 2 docker containers - one with Postgres database, another with NestJS application on ports from .env.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```
