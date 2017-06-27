module.exports = (sequelize, { STRING }) => {
  const Usage = sequelize.define(
    'Usage',
    {
      action: {
        type     : STRING,
        allowNull: false,
      },
      url: {
        type     : STRING,
        allowNull: false,
      },
      ipAddress: {
        type     : STRING,
        allowNull: true,
      },
      result: {
        type     : STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Usage;
};
