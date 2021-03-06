const { sequelize } = require("./models");

module.exports = async () => {
  if (process.env.NODE_ENV !== "test") return false;

  var transaction = await sequelize.transaction();

  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {
      raw: true,
      transaction,
    });

    await Promise.all(
      Object.keys(sequelize.models).map(async (key) => {
        return sequelize.models[key].destroy({
          where: {},
          force: true,
          cascade: true,
          truncate: true,
          restartIdentity: true,
          transaction,
        });
      })
    );

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", {
      raw: true,
      transaction,
    });
    await transaction.commit();

    return true;
  } catch (error) {
    if (transaction) await transaction.rollback();
  }
};
