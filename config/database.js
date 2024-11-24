const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

module.exports = sequelize;