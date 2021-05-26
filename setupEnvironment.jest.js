const path = require("path");
const MigrationsAndSeedersManager = require("./src/externals/sequelize/MigrationsAndSeedersManager");
const truncateTestDB = require("./src/externals/sequelize/truncateTestDB");

require("dotenv").config({
  path: path.resolve(__dirname, ".env." + process.env.NODE_ENV),
});

beforeAll(async () => {
  if (process.env.DATABASE_ENGINE === "mysql") await MigrationsAndSeedersManager.up();
});

beforeEach(async () => {
  if (process.env.DATABASE_ENGINE === "mysql") {
    await truncateTestDB();
    await MigrationsAndSeedersManager.up();
  }
});
