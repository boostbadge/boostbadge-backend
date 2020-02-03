require('dotenv').config({ path: 'variables.env' });

const env = process.env.NODE_ENV || 'development';
const wpConfig = require('../config/dbWPConfig.json')[env];

export default {
  host: wpConfig.host,
  database: wpConfig.database,
  user: process.env.DB_WP_USERNAME,
  password: process.env.DB_WP_PASSWORD,
};
