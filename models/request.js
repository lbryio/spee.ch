module.exports = (sequelize, { STRING, BOOLEAN, TEXT }) => {
  const Request = sequelize.define(
    'Request',
    {
      action: {
        type     : STRING,
        allowNull: false,
      },
      url: {
        type     : STRING,
        allowNull: false,
      },
      ipAddress: {
        type     : STRING,
        allowNull: true,
      },
      result: {
        type     : TEXT('long'),
        allowNull: true,
        default  : null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Request.associate = db => {
    console.log('test');
    Request.belongsTo(db.File, {
      onDelete  : 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
  };

  return Request;
};
