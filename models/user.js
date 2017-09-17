module.exports = (sequelize, { STRING }) => {
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
      instanceMethods: {
        validPassword: function (password) {
          return (password === this.password);
        },
      },
    }
    );

  User.associate = db => {
    User.hasMany(db.File);
    User.hasOne(db.Certificate);
  };

  return User;
};
