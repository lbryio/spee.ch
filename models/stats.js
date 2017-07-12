module.exports = (sequelize, { STRING, BOOLEAN, TEXT }) => {
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
      },
      name: {
        type     : STRING,
        allowNull: true,
      },
      claimId: {
        type     : STRING,
        allowNull: true,
      },
      fileName: {
        type     : STRING,
        allowNull: true,
      },
      fileType: {
        type     : STRING,
        allowNull: true,
      },
      nsfw: {
        type     : BOOLEAN,
        allowNull: true,
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
