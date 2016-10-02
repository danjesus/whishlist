# Whishlist Api built in NodeJs
 
A simple whishlist made on top of ES6 with nodejs, express, postgresql and docker :whale:. 

[![Code Climate](https://codeclimate.com/github/danjesus/whishlist/badges/gpa.svg)](https://codeclimate.com/github/danjesus/whishlist)
[![Test Coverage](https://codeclimate.com/github/danjesus/whishlist/badges/coverage.svg)](https://codeclimate.com/github/danjesus/whishlist/coverage)
[![CircleCI](https://circleci.com/gh/danjesus/whishlist.svg?style=svg)](https://circleci.com/gh/danjesus/whishlist)

### System Dependencies
* NodeJs V6
* PostgreSQL

## Run project with docker-compose
```$ docker-compose build; docker-compose up```

### Install app dependecies 
```$ npm install``` 

### How to use
Create a postgresql database

```$ createdb database name```

Put your credentials in config.development.js

### Run tests
Tests are running over sqlite database
```$ npm test```

### Run local
```$ npm start```

### Production
```$ npm run production```

### Creates copy config.development.js to config.production.js
```$ cp config.development.js config.production.js```

### Run npm production command
```$ npm run production```

### Api docs

To generate apidoc run
```$ npm run apidoc```

### Quality Tools
To run eslint 
```npm run lint```

To tun eslint with automatic fixes
```npm run lint:fix```
