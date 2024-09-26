const Sequelize = require("sequelize");
const Resultado = require("../model/resultado.model.js");
const sequelize = new Sequelize('db_ia', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.resultado = Resultado(sequelize, Sequelize);

module.exports = db;