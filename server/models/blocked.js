module.exports = (sequelize, { STRING }) => {
  return sequelize.define(
    'Blocked',
    {
      outpoint: {
        type     : STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
