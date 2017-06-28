module.exports = (sequelize, { STRING }) => {
  const Analytics = sequelize.define(
    'Analytics',
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
        default  : null,
      },
      result: {
        type     : STRING,
        allowNull: true,
        default  : null,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Analytics;
};
