const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const Movie = sequelize.define(
  "movie",
  {
    title: {
      type: Sequelize.STRING(150),
    },
    genres: {
      type: Sequelize.STRING(50),
    },
    year: {
      type: Sequelize.STRING(50),
    },
    photo: {
      type: Sequelize.CHAR,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Movie;
