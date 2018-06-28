module.exports = (sequelize, { STRING }) => {
  return sequelize.define(
    'Tor',
    {
      address: {
        type     : STRING,
        allowNull: false,
      },
      fingerprint: {
        type     : STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
