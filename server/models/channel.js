module.exports = (sequelize, { STRING }) => {
  const Channel = sequelize.define(
    'Channel',
    {
      channelName: {
        type     : STRING,
        allowNull: false,
      },
      channelClaimId: {
        type     : STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Channel.associate = db => {
    Channel.belongsTo(db.User);
    Channel.hasOne(db.Certificate);
  };

  return Channel;
};
