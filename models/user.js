module.exports = (sequelize, { STRING, BOOLEAN, INTEGER }) => {
  const User = sequelize.define(
        'User',
    {
      channelName: {
        type     : STRING,
        allowNull: false,
      },
      channelClaimId: {
        type     : STRING,
        allowNull: false,
      },
      password: {
        type     : STRING,
        allowNull: false,
      },
      email: {
        type     : STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
    );

  User.associate = db => {
    User.hasMany(db.File);
    User.hasOne(db.Certificate);
  };

  return User;
};
