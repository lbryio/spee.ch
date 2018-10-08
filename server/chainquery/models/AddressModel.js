const getterMethods = {
  // Add as needed, prefix all methods with `generated`
}

export default (sequelize, {
  BOOLEAN,
  DATE,
  DECIMAL,
  INTEGER,
  STRING,
  TEXT,
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
      type: DATE(6),
      set() { },
    },
    created_at: {
      type: DATE(6),
      set() { },
    },
    modified_at: {
      type: DATE(6),
      set() { },
    },
  },
  {
    freezeTableName: true,
    //getterMethods,
    timestamps: false, // don't use default timestamps columns
  }
);
