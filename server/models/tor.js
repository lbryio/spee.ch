module.exports = (sequelize, { STRING }) => {
  return sequelize.define(
    'Tor',
    {
      ip: {
        type     : STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
