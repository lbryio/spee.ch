const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  STRING, BOOLEAN, INTEGER, TEXT, DECIMAL
}) => sequelize.define(
  'address',
  {
    id: {
      primaryKey: true,
      type: INTEGER,
      set() { },
    },
    address: {
      type: STRING,
      set() { },
    },
    first_seen: {
      type: INTEGER,
      set() { },
    },
    created_at: {
      type: INTEGER,
      set() { },
    },
    modified_at: {
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
