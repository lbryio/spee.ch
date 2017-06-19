module.exports = (sequelize, { STRING, BOOLEAN }) => {
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
      outpoint: {
        type     : STRING,
        allowNull: false,
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
    },
    {
      freezeTableName: true,
    }
  );
  return File;
};
