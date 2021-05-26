const path = require("path");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: path.resolve(__dirname, "..", "..", "..", ".env." + process.env.NODE_ENV),
});

module.exports = {
  [process.env.NODE_ENV]: {
    dialect: "mysql",
    username: "root",
    password: "root",
    database: process.env.DB_NAME,
    host: "localhost",
    define: {
      paranoid: false,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    },
    timezone: "-03:00",
    seederStorage: "sequelize",
    logging: process.env.NODE_ENV === "development" ? true : false,
  },
};
