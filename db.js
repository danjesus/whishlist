'use strict';

import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let db = null;

module.exports = (app) => {

  if (null !== db) return db;
  let config = app.config;
  
  let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.params
  );

  db = {
    sequelize,
    Sequelize,
    models: {}
  };

  let dir = path.join(__dirname, 'models');

  fs.readdirSync(dir).forEach(file => {
    let modelDir = path.join(dir, file);
    let model = sequelize.import(modelDir);

    if (model)
      db.models[model.name] = model;
  });

  Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
  });

  return db;
};
