const Sequelize = require("sequelize");

const sequelize = new Sequelize("Week 10", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
