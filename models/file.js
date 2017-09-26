module.exports = (sequelize, { STRING, BOOLEAN, INTEGER }) => {
  const File = sequelize.define(
    'File',
    {
      name: {
        type     : STRING,
        allowNull: false,
      },
      claimId: {
        type     : STRING,
        allowNull: false,
      },
      address: {
        type     : STRING,
        allowNull: false,
      },
      outpoint: {
        type     : STRING,
        allowNull: false,
      },
      height: {
        type     : INTEGER,
        allowNull: false,
        default  : 0,
      },
      fileName: {
        type     : STRING,
        allowNull: false,
      },
      filePath: {
        type     : STRING,
        allowNull: false,
      },
      fileType: {
        type: STRING,
      },
      nsfw: {
        type        : BOOLEAN,
        allowNull   : false,
        defaultValue: false,
      },
      trendingEligible: {
        type        : BOOLEAN,
        allowNull   : false,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      underscored    : true,
    }
  );

  File.associate = db => {
    File.hasMany(db.Request);
    File.belongsTo(db.User, {
      onDelete  : 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
    File.hasOne(db.Claim);
  };

  return File;
};
