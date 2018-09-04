const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  STRING, BOOLEAN, INTEGER, TEXT, DECIMAL
}) => sequelize.define(
  'application_status',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    app_version: {
      type: INTEGER,
      set() { },
    },
    data_version: {
      type: INTEGER,
      set() { },
    },
    api_version: {
      type: INTEGER,
      set() { },
    },
  },
  {
    freezeTableName: true,
    getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);
