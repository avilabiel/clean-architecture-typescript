const path = require("path");
const Umzug = require("umzug");
const models = require("./models");

const migrationsPath = path.resolve(__dirname, "migrations");
const seedersPath = path.resolve(__dirname, "seeders");

const migrationsConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize,
  },
  migrations: {
    params: [models.sequelize.getQueryInterface(), models.sequelize.constructor],
    path: migrationsPath,
    pattern: /\.js$/,
  },
};

const seedersConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize,
  },
  migrations: {
    params: [models.sequelize.getQueryInterface(), models.sequelize.constructor],
    path: seedersPath,
    pattern: /\.js$/,
  },
};

const migrations = new Umzug(migrationsConfig);
const seeds = new Umzug(seedersConfig);

module.exports = {
  up: () => migrations.up().then(() => seeds.up()),
  down: () => migrations.down(),
};
