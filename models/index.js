import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const bbConfig = require('../config/bbConfig.json')[env];

const sequelize = new Sequelize(bbConfig);

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
