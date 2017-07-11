module.exports = (sequelize, { STRING, TEXT }) => {
  const Stats = sequelize.define(
    'Stats',
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
      name: {
        type     : STRING,
        allowNull: true,
        default  : null,
      },
      claimId: {
        type     : STRING,
        allowNull: true,
        default  : null,
      },
      result: {
        type     : TEXT('long'),
        allowNull: true,
        default  : null,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Stats;
};
