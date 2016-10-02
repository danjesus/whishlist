FROM node:6.7.0

RUN npm install -g node-gyp

RUN mkdir -p /app
WORKDIR /app

COPY ./ /app/

RUN npm install

RUN cd node_modules/bcrypt && node-gyp rebuild && cd ../..

ENTRYPOINT ["npm"]

