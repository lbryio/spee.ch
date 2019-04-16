export default (sequelize, { STRING, BOOLEAN, INTEGER }) => {
  const File = sequelize.define(
    'File',
    {
      name: {
        type: STRING,
        allowNull: false,
      },
      claimId: {
        type: STRING,
        allowNull: false,
      },
      outpoint: {
        type: STRING,
        allowNull: false,
      },
      fileHeight: {
        type: INTEGER,
        allowNull: false,
        default: 0,
      },
      fileWidth: {
        type: INTEGER,
        allowNull: false,
        default: 0,
      },
      fileName: {
        type: STRING,
        allowNull: false,
      },
      filePath: {
        type: STRING,
        allowNull: false,
      },
      fileType: {
        type: STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  File.associate = db => {
    File.hasOne(db.Claim);
  };

  return File;
};
