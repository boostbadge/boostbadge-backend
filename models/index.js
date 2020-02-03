import Sequelize from 'sequelize';

require('dotenv').config({ path: 'variables.env' });

const env = process.env.NODE_ENV || 'DEV';
const bbConfig = require('../config/dbBBConfig.json')[env];

console.log(bbConfig);
const sequelize = new Sequelize({
  ...bbConfig,
  username: process.env.DB_BB_USERNAME,
  password: process.env.DB_BB_PASSWORD,
});

const models = {
  User: sequelize.import('./user'),
  Vehicle: sequelize.import('./vehicle'),
  Photo: sequelize.import('./photo'),
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
