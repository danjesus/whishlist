FROM node:6.17.1

RUN npm install -g node-gyp

RUN mkdir -p /app
WORKDIR /app

COPY ./ /app/

RUN cd $(npm root -g)/npm \
  && npm install fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

RUN cd node_modules/bcrypt && node-gyp rebuild && cd ../..

ENTRYPOINT ["npm"]

