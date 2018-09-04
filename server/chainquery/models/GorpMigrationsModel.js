const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  STRING, BOOLEAN, INTEGER, TEXT, DECIMAL
}) => sequelize.define(
  'gorp_migrations',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    applied_at: {
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
