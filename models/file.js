module.exports = (sequelize, { STRING, BOOLEAN }) => {
  const File = sequelize.define(
    'File',
    {
      name: {
        type     : STRING,
        allowNull: false,
      },
      claim_id: {
        type     : STRING,
        allowNull: false,
      },
      outpoint: {
        type     : STRING,
        allowNull: false,
      },
      file_name: {
        type     : STRING,
        allowNull: false,
      },
      file_path: {
        type     : STRING,
        allowNull: false,
      },
      file_type: {
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
  )
  return File
}
