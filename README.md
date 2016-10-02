# whishlist
A simple whishlist made on top of ES6 with nodejs, express and postgresql. 

[![Code Climate](https://codeclimate.com/github/danjesus/whishlist/badges/gpa.svg)](https://codeclimate.com/github/danjesus/whishlist)
[![Test Coverage](https://codeclimate.com/github/danjesus/whishlist/badges/coverage.svg)](https://codeclimate.com/github/danjesus/whishlist/coverage)

### System Dependencies
* NodeJs V6
* PostgreSQL

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

To tun eslint with automativc fixes
```npm run lint:fix```
